"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

const VERT = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform float uProjectionIntensity;
uniform float uReflectionGain;
uniform float uHighlightBoost;
uniform float uLumaVisibilityThreshold;
uniform float uInvertColor;
uniform float uHalftone;
uniform float uToneCut;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(
    0.211324865405187,
    0.366025403784439,
    -0.577350269189626,
    0.024390243902439
  );
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * snoise(p);
    p = p * 2.0 + vec2(17.0, 31.0);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv;
  vec2 p = uv * 2.0 - 1.0;
  float t = uTime;

  vec2 flow = vec2(t * 0.19, t * 0.13);
  vec2 q = vec2(
    fbm(p * 1.05 + flow),
    fbm(p * 1.05 + vec2(-flow.y * 1.1, flow.x * 0.9))
  );
  vec2 w = p + q * 0.62;

  float nA = 0.5 + 0.5 * fbm(w * 2.15 + flow * 0.8);
  float nB = 0.5 + 0.5 * fbm(w * 4.8 + vec2(-flow.x * 0.5, flow.y * 0.35));
  float ridge = 1.0 - abs(2.0 * nB - 1.0);
  float mask = clamp(0.18 + 1.12 * (0.58 * nA + 0.42 * ridge), 0.0, 1.0);
  float edgeFade = 1.0 - clamp(length(p) * 0.7, 0.0, 1.0);
  float intensity = pow(clamp(mask * (0.72 + edgeFade * 0.45), 0.0, 1.0), 1.05);

  float base = nA * 0.82 + ridge * 0.18;
  vec3 col = vec3(
    0.18 + 0.86 * (0.5 + 0.5 * cos(6.28318 * (base + 0.02 + t * 0.07))),
    0.14 + 0.9  * (0.5 + 0.5 * cos(6.28318 * (base + 0.37 + t * 0.06))),
    0.2  + 0.9  * (0.5 + 0.5 * cos(6.28318 * (base + 0.72 + t * 0.065)))
  );
  col *= intensity;

  float highlight = pow(clamp((nA * 1.1 + ridge * 0.75) - 1.1, 0.0, 1.0), 2.2);
  col = mix(col, vec3(1.0, 0.96, 0.92), highlight * vec3(0.22, 0.16, 0.1));
  vec3 tex = clamp(col, 0.0, 1.0);

  if (uInvertColor > 0.5) {
    tex = vec3(1.0) - tex;
  }

  if (uToneCut > 0.5) {
    float toneLevels = 5.0;
    tex = floor(tex * (toneLevels - 1.0) + 0.5) / (toneLevels - 1.0);
  }

  float lum = dot(tex, vec3(0.2126, 0.7152, 0.0722));
  float lumaStart = clamp(uLumaVisibilityThreshold, 0.0, 1.0);
  float lumaEnd = min(1.0, lumaStart + 0.1);
  float darkMask = 1.0;
  if (lumaStart > 1e-4) {
    darkMask = smoothstep(lumaStart, lumaEnd, lum);
  }

  if (uHalftone > 0.5) {
    vec2 hUv = vUv * vec2(180.0, 120.0);
    vec2 hCell = fract(hUv) - 0.5;
    float dotRadius = mix(0.02, 0.45, clamp(lum, 0.0, 1.0));
    float dotMask = 1.0 - smoothstep(dotRadius, dotRadius + 0.035, length(hCell));
    tex *= dotMask * darkMask;
  }

  float hi = smoothstep(0.5, 1.0, lum);
  tex *= darkMask;
  tex *= mix(1.0, uHighlightBoost, hi);
  tex *= max(0.0, uProjectionIntensity) * max(0.0, uReflectionGain);

  gl_FragColor = vec4(tex, 1.0);
}
`;

const TUNE = {
  projectionIntensity: 1.64,
  reflectionGain: 1.0,
  blurRadiusPx: 64,
  highlightBoost: 1.65,
  lumaVisibilityThreshold: 0.12,
  invertColor: false,
  halftone: true,
  toneCut: false,
};

export const ProjectionHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tuneRef = useRef({ ...TUNE });
  const [isOpen, setIsOpen] = useState(true);
  const [isCoreOpen, setIsCoreOpen] = useState(true);
  const [tune, setTune] = useState({ ...TUNE });

  const updateTune = <K extends keyof typeof TUNE>(key: K, value: typeof TUNE[K]) => {
    tuneRef.current[key] = value;
    setTune((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.78;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x030405); // Match site background

    const camera = new THREE.PerspectiveCamera(45, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 100);
    camera.position.set(0, 1.2, 5.5);
    camera.lookAt(0, 0.8, 0);

    // --- GRADIENT SOURCES ---
    const createSource = () => {
      const sourceScene = new THREE.Scene();
      const sourceCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const sourceMaterial = new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        uniforms: {
          uTime: { value: 0 },
          uProjectionIntensity: { value: 0.5 },
          uReflectionGain: { value: 1.0 },
          uHighlightBoost: { value: 1.65 },
          uLumaVisibilityThreshold: { value: 0.3 },
          uInvertColor: { value: 0 },
          uHalftone: { value: 0 },
          uToneCut: { value: 0 },
        },
      });
      const sourceQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), sourceMaterial);
      sourceScene.add(sourceQuad);

      const target = new THREE.WebGLRenderTarget(1024, 576);
      return { sourceScene, sourceCamera, sourceMaterial, target };
    };

    const screenSource = createSource();
    const projectionSource = createSource();

    // --- MESHES ---
    const floorKeyboardMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a22,
      roughness: 0.88,
      metalness: 0.06,
    });

    const floorGeo = new THREE.PlaneGeometry(100, 100, 64, 64);
    floorGeo.rotateX(-Math.PI / 2);
    const floor = new THREE.Mesh(floorGeo, floorKeyboardMat);
    floor.receiveShadow = true;
    scene.add(floor);

    // Keyboard
    const keyboardGroup = new THREE.Group();
    const base = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.045, 0.42), floorKeyboardMat);
    base.position.y = 0.0225;
    base.castShadow = true;
    base.receiveShadow = true;
    keyboardGroup.add(base);

    const keyGeo = new THREE.BoxGeometry(0.09, 0.072, 0.07);
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 10; c++) {
        const key = new THREE.Mesh(keyGeo, floorKeyboardMat);
        key.position.set(-0.46 + c * 0.102, 0.08, -0.12 + r * 0.082);
        key.castShadow = true;
        key.receiveShadow = true;
        keyboardGroup.add(key);
      }
    }
    keyboardGroup.position.set(0, 0, 1.28);
    scene.add(keyboardGroup);

    // Screen
    const screenMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 1.3),
      new THREE.MeshBasicMaterial({ map: screenSource.target.texture, side: THREE.DoubleSide })
    );
    screenMesh.position.set(0, 1.0, 0.5);
    scene.add(screenMesh);

    // --- LIGHTS ---
    const spot = new THREE.SpotLight(0xffffff, 220);
    spot.decay = 6;
    spot.distance = 35;
    spot.angle = Math.PI / 3.1;
    spot.penumbra = 0.58;
    spot.map = projectionSource.target.texture;
    spot.castShadow = true;
    spot.shadow.mapSize.set(1024, 1024);
    spot.position.set(0, 1.0, 0.52);
    spot.target.position.set(0, 0.02, 1.15);
    scene.add(spot, spot.target);

    const hemi = new THREE.HemisphereLight(0xffffff, 0x060608, 0.04);
    scene.add(hemi);

    // --- COMPOSER ---
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.22, 0.42, 0.72);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());

    // --- ANIMATION ---
    const animate = () => {
      const t = performance.now() * 0.001;
      const currentTune = tuneRef.current;

      // Render Sources
      const prevTarget = renderer.getRenderTarget();
      
      // Screen Source
      screenSource.sourceMaterial.uniforms.uTime.value = t;
      renderer.setRenderTarget(screenSource.target);
      renderer.render(screenSource.sourceScene, screenSource.sourceCamera);

      // Projection Source
      projectionSource.sourceMaterial.uniforms.uTime.value = t;
      projectionSource.sourceMaterial.uniforms.uProjectionIntensity.value = currentTune.projectionIntensity;
      projectionSource.sourceMaterial.uniforms.uReflectionGain.value = currentTune.reflectionGain;
      projectionSource.sourceMaterial.uniforms.uHighlightBoost.value = currentTune.highlightBoost;
      projectionSource.sourceMaterial.uniforms.uLumaVisibilityThreshold.value = currentTune.lumaVisibilityThreshold;
      projectionSource.sourceMaterial.uniforms.uHalftone.value = currentTune.halftone ? 1 : 0;
      renderer.setRenderTarget(projectionSource.target);
      renderer.render(projectionSource.sourceScene, projectionSource.sourceCamera);

      renderer.setRenderTarget(prevTarget);

      spot.intensity = 220 * currentTune.projectionIntensity * currentTune.reflectionGain;
      bloom.radius = THREE.MathUtils.clamp(currentTune.blurRadiusPx / 128, 0, 1);
      bloom.strength = 0.22 * Math.max(0.2, currentTune.highlightBoost);

      composer.render();
      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="relative w-full h-[600px] overflow-hidden bg-background border-b border-primary/20"
    >
      <div ref={containerRef} className="absolute inset-0" />

      {/* ── lil-gui Style Panel ─────────────────────────────── */}
      <div
        className="absolute top-2 right-2 z-10 select-none overflow-hidden"
        style={{
          width: 260,
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          fontSize: 11,
          boxShadow: "0 2px 8px rgba(0,0,0,0.6)",
          border: "1px solid #3c3c3c",
        }}
      >
        {/* ── Panel Title Bar */}
        <div
          className="flex items-center justify-between cursor-pointer"
          style={{
            background: "#1f1f1f",
            padding: "0 8px",
            height: 24,
            borderBottom: isOpen ? "1px solid #3c3c3c" : "none",
            letterSpacing: "0.02em",
          }}
          onClick={() => setIsOpen((o) => !o)}
        >
          <span style={{ color: "#ebebeb", fontWeight: 600 }}>Projection (index)</span>
          <span style={{ color: "#666", fontSize: 9, marginLeft: 4 }}>{isOpen ? "▾" : "▸"}</span>
        </div>

        {isOpen && (
          <div style={{ background: "#1a1a1a" }}>

            {/* ── Projection Core Folder */}
            <div
              className="flex items-center cursor-pointer"
              style={{
                height: 22,
                paddingLeft: 8,
                borderBottom: "1px solid #2a2a2a",
                borderLeft: "4px solid #6e6e6e",
                gap: 6,
              }}
              onClick={() => setIsCoreOpen((o) => !o)}
            >
              <span style={{ color: "#aaa", fontSize: 9 }}>{isCoreOpen ? "▾" : "▸"}</span>
              <span style={{ color: "#ebebeb", fontWeight: 600, letterSpacing: "0.02em" }}>
                Projection Core
              </span>
            </div>

            {isCoreOpen && (
              <div style={{ borderLeft: "4px solid #6e6e6e" }}>
                <GuiSlider label="Projection intensity" min={0} max={3} step={0.01}
                  value={tune.projectionIntensity}
                  onChange={(v) => updateTune("projectionIntensity", v)} />
                <GuiSlider label="Reflection strength" min={0} max={4} step={0.01}
                  value={tune.reflectionGain}
                  onChange={(v) => updateTune("reflectionGain", v)} />
                <GuiSlider label="Blur amount" min={0} max={128} step={1}
                  value={tune.blurRadiusPx}
                  onChange={(v) => updateTune("blurRadiusPx", v)} />
                <GuiSlider label="Highlight boost" min={0.5} max={4} step={0.05}
                  value={tune.highlightBoost}
                  onChange={(v) => updateTune("highlightBoost", v)} />
                <GuiSlider label="Visible luma threshold" min={0} max={1} step={0.01}
                  value={tune.lumaVisibilityThreshold}
                  onChange={(v) => updateTune("lumaVisibilityThreshold", v)} />
                <GuiToggle label="Invert color" value={tune.invertColor}
                  onChange={(v) => updateTune("invertColor", v)} />
                <GuiToggle label="Halftone" value={tune.halftone}
                  onChange={(v) => updateTune("halftone", v)} />
                <GuiToggle label="Tone cut (hard bands)" value={tune.toneCut}
                  onChange={(v) => updateTune("toneCut", v)} />
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

/* ── Mini GUI Primitives ────────────────────────────────────── */
function GuiSlider({ label, min, max, step, value, onChange }: {
  label: string; min: number; max: number; step: number;
  value: number; onChange: (v: number) => void;
}) {
  return (
    <div
      className="flex items-stretch"
      style={{
        height: 20,
        borderBottom: "1px solid #252525",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* Label */}
      <div
        className="flex items-center"
        style={{
          width: "45%",
          paddingLeft: 8,
          paddingRight: 4,
          color: "#c2c2c2",
          fontSize: 10,
          borderRight: "1px solid #2a2a2a",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </div>
      {/* Slider track */}
      <div className="flex items-center flex-1" style={{ padding: "0 6px", gap: 4 }}>
        <input
          type="range" min={min} max={max} step={step} value={value}
          style={{
            flex: 1,
            height: 2,
            accentColor: "#00FF9C",
            cursor: "pointer",
            outline: "none",
          }}
          onChange={(e) => onChange(parseFloat(e.target.value))}
        />
        <span style={{ color: "#ebebeb", fontSize: 10, minWidth: 30, textAlign: "right" }}>
          {value.toFixed(step < 1 ? 2 : 0)}
        </span>
      </div>
    </div>
  );
}

function GuiToggle({ label, value, onChange }: {
  label: string; value: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <div
      className="flex items-center justify-between cursor-pointer"
      style={{
        height: 20,
        borderBottom: "1px solid #252525",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        padding: "0 8px 0 8px",
      }}
      onClick={() => onChange(!value)}
    >
      <span style={{ color: "#c2c2c2", fontSize: 10 }}>{label}</span>
      {/* Checkbox styled like lil-gui */}
      <div
        style={{
          width: 15,
          height: 15,
          border: "1px solid #555",
          background: value ? "#00FF9C" : "#111",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {value && (
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
            <polyline points="1.5,4.5 3.5,7 7.5,2" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
    </div>
  );
}
