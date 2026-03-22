"use client";

import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useTexture, Sphere as SphereGeo, Html, Decal } from "@react-three/drei";
import { Physics, RigidBody, BallCollider, RapierRigidBody } from "@react-three/rapier";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

// TECHNICAL ARSENAL:
// <h2 class="title">
//   <span class="reveal-wrapper"><span class="reveal-text">TECHNICAL</span></span>
//   <span class="reveal-wrapper"><span class="reveal-text"><span class="hat-h2">ARSENA</span><span class="section-glow-char">L</span></span></span>
// </h2>

// TECH STACK:
// <h2 class="title">
//   <span class="reveal-wrapper"><span class="reveal-text">TECH</span></span>
//   <span class="reveal-wrapper"><span class="reveal-text"><span class="hat-h2">STAC</span><span class="section-glow-char">K</span></span></span>
// </h2>

const techStack = [
  { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "TensorFlow", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
  { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Kubernetes", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
  { name: "AWS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Git", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Jupyter", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" },
  { name: "FastAPI", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { name: "NumPy", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
  { name: "Pandas", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
  { name: "Scikit-learn", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg" },
  { name: "DVC", url: "https://cdn.simpleicons.org/dvc" },
  { name: "Airflow", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apacheairflow/apacheairflow-original.svg" },
  { name: "Kubeflow", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubeflow/kubeflow-original.svg" },
  { name: "Jenkins", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" },
  { name: "Terraform", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" },
  { name: "Prometheus", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg" },
  { name: "Grafana", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg" },
  { name: "Selenium", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg" },
  { name: "PyTest", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytest/pytest-original.svg" },
  { name: "Postman", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
  { name: "JIRA", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg" },
  { name: "PowerBI", url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0YyQzgxMSI+PHBhdGggZD0iTTQgMjBoMTZ2Mkg0ek00IDEyaDR2OEg0em02LThoNHYxNmgtNHptNiA0aDR2MTJoLTR6Ii8+PC9zdmc+" },
  { name: "MySQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg" },
  { name: "Hugging Face", url: "https://cdn.simpleicons.org/huggingface" },
  { name: "LangChain", url: "https://cdn.simpleicons.org/langchain" },
  { name: "Linux", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "Streamlit", url: "https://cdn.simpleicons.org/streamlit" },
  { name: "VS Code", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "GitHub", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
];

interface BalloonProps {
  vec?: THREE.Vector3;
  imageUrl: string;
  name: string;
  position: [number, number, number];
}

const Balloon = ({ vec = new THREE.Vector3(), imageUrl, name, position }: BalloonProps) => {
  const api = useRef<RapierRigidBody>(null);
  const texture = useTexture(imageUrl);

  useFrame(() => {
    if (api.current) {
      api.current.applyImpulse(
        vec.copy(api.current.translation()).negate().multiplyScalar(0.15),
        true
      );
    }
  });

  return (
    <RigidBody 
      position={position} 
      linearDamping={4} 
      angularDamping={1} 
      friction={0.1} 
      colliders={false} 
      ref={api}
      enabledRotations={[false, false, false]}
    >
      <BallCollider args={[1]} />
      <SphereGeo args={[1, 64, 64]}>
        <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.1} />
        <Decal position={[0, 0, 1]} rotation={[0, 0, 0]} scale={1.2} map={texture} />
      </SphereGeo>
      
      {/* Name Label */}
      <Html center position={[0, -1.5, 0]} className="pointer-events-none">
        <div className="bg-[#111111]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-white/90 font-mono text-[11px] whitespace-nowrap shadow-xl">
          {name}
        </div>
      </Html>
    </RigidBody>
  );
};

const Pointer = ({ vec = new THREE.Vector3() }) => {
  const ref = useRef<RapierRigidBody>(null);
  useFrame(({ mouse, viewport }) => {
    if (ref.current) {
      ref.current.setNextKinematicTranslation(
        vec.set((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0)
      );
    }
  });
  return (
    <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[1.1]} />
    </RigidBody>
  );
};

export default function TechnicalArsenal() {
  const [spheres] = useState(() => {
    return techStack.map((tech) => ({
      position: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10] as [number, number, number],
      imageUrl: tech.url,
      name: tech.name,
    }));
  });

  return (
    <section id="arsenal" className="bg-[#0a0a0a] relative overflow-hidden flex flex-col items-center">
      <div className="flex justify-center" style={{ paddingBottom: '100px' }}>
        <SectionHeading
          thinText="TECHNICAL"
          boldText="ARSENAL"
          glowChar="L"
          glowColor="purple"
          className="justify-center text-center w-full"
        />
      </div>

      <div style={{ width: "100%", height: "500px" }}>
        <Canvas shadows camera={{ position: [0, 0, 15], fov: 35 }}>
          <ambientLight intensity={1.5} />
          <spotLight position={[20, 20, 10]} penumbra={1} castShadow angle={0.2} intensity={2} />
          <Physics gravity={[0, 0, 0]}>
            <Pointer />
            {spheres.map((props, i) => (
              <Balloon key={i} {...props} />
            ))}
          </Physics>
          <Environment preset="city" />
          <EffectComposer>
            <N8AO aoRadius={2} intensity={1} color="#0a0a0a" />
          </EffectComposer>
        </Canvas>
      </div>
      <div className="mb-[6rem]" />
    </section>
  );
}
