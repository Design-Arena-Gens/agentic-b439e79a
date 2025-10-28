'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [formData, setFormData] = useState({
    movement: 'dolly-out',
    speed: 'slow',
    startFrame: 'close-up',
    subject: 'forklift',
    environment: 'industrial-warehouse',
    emphasis: ['scale', 'presence'],
    visualEffects: ['metallic-reflections'],
    mood: 'professional',
  });

  const [generatedPrompt, setGeneratedPrompt] = useState('');

  const movementTypes = [
    { value: 'dolly-out', label: 'Dolly Out' },
    { value: 'dolly-in', label: 'Dolly In' },
    { value: 'truck-left', label: 'Truck Left' },
    { value: 'truck-right', label: 'Truck Right' },
    { value: 'pan-left', label: 'Pan Left' },
    { value: 'pan-right', label: 'Pan Right' },
    { value: 'tilt-up', label: 'Tilt Up' },
    { value: 'tilt-down', label: 'Tilt Down' },
    { value: 'crane-up', label: 'Crane Up' },
    { value: 'crane-down', label: 'Crane Down' },
    { value: 'zoom-in', label: 'Zoom In' },
    { value: 'zoom-out', label: 'Zoom Out' },
    { value: 'orbit', label: 'Orbit' },
    { value: 'push-in', label: 'Push In' },
    { value: 'pull-back', label: 'Pull Back' },
  ];

  const speeds = [
    { value: 'very-slow', label: 'Very Slow' },
    { value: 'slow', label: 'Slow' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'fast', label: 'Fast' },
    { value: 'very-fast', label: 'Very Fast' },
  ];

  const startFrames = [
    { value: 'extreme-close-up', label: 'Extreme Close-Up' },
    { value: 'close-up', label: 'Close-Up' },
    { value: 'medium-shot', label: 'Medium Shot' },
    { value: 'wide-shot', label: 'Wide Shot' },
    { value: 'extreme-wide-shot', label: 'Extreme Wide Shot' },
  ];

  const emphasisOptions = [
    'scale', 'presence', 'texture', 'detail', 'atmosphere', 'lighting',
    'depth', 'environment', 'character', 'mood', 'power', 'elegance'
  ];

  const visualEffectOptions = [
    'metallic-reflections', 'lens-flare', 'depth-of-field', 'motion-blur',
    'light-rays', 'dust-particles', 'atmospheric-haze', 'rim-lighting',
    'volumetric-lighting', 'chromatic-aberration', 'bloom', 'shadows'
  ];

  const moods = [
    { value: 'cinematic', label: 'Cinematic' },
    { value: 'professional', label: 'Professional' },
    { value: 'dramatic', label: 'Dramatic' },
    { value: 'ethereal', label: 'Ethereal' },
    { value: 'gritty', label: 'Gritty' },
    { value: 'elegant', label: 'Elegant' },
    { value: 'dynamic', label: 'Dynamic' },
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMultiSelect = (field, value) => {
    setFormData(prev => {
      const current = prev[field];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter(v => v !== value) };
      } else {
        return { ...prev, [field]: [...current, value] };
      }
    });
  };

  const generatePrompt = () => {
    const movementDescriptions = {
      'dolly-out': 'dolly out',
      'dolly-in': 'dolly in',
      'truck-left': 'truck left',
      'truck-right': 'truck right',
      'pan-left': 'pan left',
      'pan-right': 'pan right',
      'tilt-up': 'tilt up',
      'tilt-down': 'tilt down',
      'crane-up': 'crane up',
      'crane-down': 'crane down',
      'zoom-in': 'zoom in',
      'zoom-out': 'zoom out',
      'orbit': 'orbit around',
      'push-in': 'push in',
      'pull-back': 'pull back',
    };

    const speedDescriptions = {
      'very-slow': 'Very slow, deliberate',
      'slow': 'Slow, smooth',
      'moderate': 'Steady, controlled',
      'fast': 'Quick, dynamic',
      'very-fast': 'Rapid, energetic',
    };

    const frameDescriptions = {
      'extreme-close-up': 'an extreme close-up',
      'close-up': 'a close-up',
      'medium-shot': 'a medium shot',
      'wide-shot': 'a wide shot',
      'extreme-wide-shot': 'an extreme wide shot',
    };

    const effectDescriptions = {
      'metallic-reflections': 'Subtle environmental reflections on metallic surfaces',
      'lens-flare': 'Natural lens flare from light sources',
      'depth-of-field': 'Shallow depth of field with smooth bokeh',
      'motion-blur': 'Subtle motion blur enhancing movement',
      'light-rays': 'Volumetric light rays cutting through space',
      'dust-particles': 'Floating dust particles caught in light',
      'atmospheric-haze': 'Atmospheric haze adding depth',
      'rim-lighting': 'Beautiful rim lighting defining edges',
      'volumetric-lighting': 'Dramatic volumetric lighting',
      'chromatic-aberration': 'Subtle chromatic aberration for cinematic feel',
      'bloom': 'Gentle bloom on bright areas',
      'shadows': 'Dynamic shadows enhancing depth',
    };

    const movement = movementDescriptions[formData.movement];
    const speed = speedDescriptions[formData.speed];
    const startFrame = frameDescriptions[formData.startFrame];
    const subject = formData.subject || 'subject';
    const emphasis = formData.emphasis.join(' and ');
    const effects = formData.visualEffects.map(e => effectDescriptions[e]).join('. ');

    let prompt = `${speed} ${movement}. Start with ${startFrame} on the ${subject}'s `;

    if (formData.movement.includes('out') || formData.movement.includes('back')) {
      prompt += `defining features, then gracefully reveal the entire ${subject} in its environment.`;
    } else if (formData.movement.includes('in') || formData.movement.includes('push')) {
      prompt += `silhouette in the environment, then smoothly move closer to reveal intricate details.`;
    } else if (formData.movement.includes('orbit')) {
      prompt += `front profile, then smoothly circle around to showcase all angles.`;
    } else {
      prompt += `form and details, transitioning smoothly through the scene.`;
    }

    if (emphasis) {
      prompt += ` Emphasize ${emphasis}.`;
    }

    if (effects) {
      prompt += ` ${effects}.`;
    }

    if (formData.mood) {
      prompt += ` Maintain a ${formData.mood} aesthetic throughout.`;
    }

    setGeneratedPrompt(prompt);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    alert('Prompt copied to clipboard!');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>🎬 Cinematic Camera Movement Prompt Generator</h1>
        <p className={styles.subtitle}>Create professional camera movement descriptions for video generation</p>
      </header>

      <main className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.form}>
            <section className={styles.section}>
              <label className={styles.label}>Camera Movement</label>
              <select
                className={styles.select}
                value={formData.movement}
                onChange={(e) => handleChange('movement', e.target.value)}
              >
                {movementTypes.map(m => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
            </section>

            <section className={styles.section}>
              <label className={styles.label}>Movement Speed</label>
              <select
                className={styles.select}
                value={formData.speed}
                onChange={(e) => handleChange('speed', e.target.value)}
              >
                {speeds.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </section>

            <section className={styles.section}>
              <label className={styles.label}>Starting Frame</label>
              <select
                className={styles.select}
                value={formData.startFrame}
                onChange={(e) => handleChange('startFrame', e.target.value)}
              >
                {startFrames.map(f => (
                  <option key={f.value} value={f.value}>{f.label}</option>
                ))}
              </select>
            </section>

            <section className={styles.section}>
              <label className={styles.label}>Subject/Object</label>
              <input
                type="text"
                className={styles.input}
                value={formData.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
                placeholder="e.g., forklift, sports car, building"
              />
            </section>

            <section className={styles.section}>
              <label className={styles.label}>Environment Context</label>
              <input
                type="text"
                className={styles.input}
                value={formData.environment}
                onChange={(e) => handleChange('environment', e.target.value)}
                placeholder="e.g., industrial warehouse, city street"
              />
            </section>

            <section className={styles.section}>
              <label className={styles.label}>Emphasis (Select Multiple)</label>
              <div className={styles.checkboxGrid}>
                {emphasisOptions.map(opt => (
                  <label key={opt} className={styles.checkbox}>
                    <input
                      type="checkbox"
                      checked={formData.emphasis.includes(opt)}
                      onChange={() => handleMultiSelect('emphasis', opt)}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </section>

            <section className={styles.section}>
              <label className={styles.label}>Visual Effects (Select Multiple)</label>
              <div className={styles.checkboxGrid}>
                {visualEffectOptions.map(opt => (
                  <label key={opt} className={styles.checkbox}>
                    <input
                      type="checkbox"
                      checked={formData.visualEffects.includes(opt)}
                      onChange={() => handleMultiSelect('visualEffects', opt)}
                    />
                    <span>{opt.replace(/-/g, ' ')}</span>
                  </label>
                ))}
              </div>
            </section>

            <section className={styles.section}>
              <label className={styles.label}>Overall Mood</label>
              <select
                className={styles.select}
                value={formData.mood}
                onChange={(e) => handleChange('mood', e.target.value)}
              >
                {moods.map(m => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
            </section>

            <button className={styles.generateBtn} onClick={generatePrompt}>
              Generate Prompt
            </button>
          </div>

          <div className={styles.output}>
            <div className={styles.promptCard}>
              <h2 className={styles.promptTitle}>Generated Camera Movement Prompt</h2>
              {generatedPrompt ? (
                <>
                  <p className={styles.promptText}>{generatedPrompt}</p>
                  <button className={styles.copyBtn} onClick={copyToClipboard}>
                    📋 Copy to Clipboard
                  </button>
                </>
              ) : (
                <p className={styles.placeholder}>
                  Your generated prompt will appear here. Fill out the form and click "Generate Prompt" to create your camera movement description.
                </p>
              )}
            </div>

            <div className={styles.exampleCard}>
              <h3 className={styles.exampleTitle}>Example Output</h3>
              <p className={styles.exampleText}>
                "Slow, smooth dolly out. Start with a close-up on the forklift's defining features, then gracefully reveal the entire forklift in its environment. Emphasize scale and presence. Subtle environmental reflections on metallic surfaces. Maintain a professional aesthetic throughout."
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Perfect for AI video generation tools like Runway, Pika, Stable Video Diffusion, and more</p>
      </footer>
    </div>
  );
}
