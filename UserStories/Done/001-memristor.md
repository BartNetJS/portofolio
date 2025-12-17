# US-001: Interactive Memristor Learning Simulator

Create an interactive HTML page (single file, using D3.js v7) that simulates how memristor-based neural networks learn arithmetic operations. This is an educational tool that must visualize THREE key aspects:

1. **Physical Device**: How a memristor works internally (ions moving, resistance changing)
2. **Mathematical Computation**: How current flows and multiplication happens (I = V × W)
3. **Machine Learning**: Training on multiple examples, then generalizing to new inputs

---

## What is a Memristor?

A memristor is a two-terminal electrical component that regulates the flow of electrical current in a circuit and remembers the amount of charge that has previously flowed through it.

- **Physical Mechanism**: Mobile ions (like Oxygen vacancies) drift under an electric field.
- **Variable Resistance**: The position of these ions changes the ratio between a conductive ("doped") region and a resistive ("undoped") region.
- **Non-Volatile**: When voltage is removed, ions stay in place, "remembering" the resistance state.
- **Analog Weight**: This tunable conductance ($G = 1/R$) acts as a physical synaptic weight.

**Physical structure to visualize:**

```
[Top Electrode +V] ════════════════════════════
         │
┌────────┴─────────────────────────────────────┐
│ ●●●●●●●●●○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○○ │
│   DOPED        │         UNDOPED             │
│  (Conductive)  │        (Resistive)          │
└────────┬─────────────────────────────────────┘
         │
[Bottom Electrode GND] ════════════════════════
```

- **● = Oxygen Vacancies (+)** (act as charge carriers/dopants)
- **Doped region** (Low Resistance) vs **Undoped region** (High Resistance)
- **Boundary movement** changes total Conductance (G).

### Context: The Bigger Picture (Crossbar Arrays)

While this simulator focuses on a **single memristor** to teach the fundamental physics, real-world AI hardware uses **Crossbar Arrays**.

- **Single Device**: Performs scalar multiplication ($I = V \times G$).
- **Crossbar Array**: A grid of memristors performs Matrix-Vector Multiplication (MVM) in one step. - Input voltages = Vector - Memristor grid = Matrix Weights - Output currents = Result Vector (via Kirchhoff's Law)
  _This tool teaches the unit cell (the synapse) that makes these powerful arrays possible._

---

## Core Requirements

### 1. Physical Memristor Visualization

Draw an SVG showing the memristor cross-section with:

- Two metal electrodes (top and bottom) with voltage labels
- A channel containing 15-25 ion particles (small circles)
- Doped region (cyan) and undoped region (dark purple)
- A visible boundary line between regions

**During TRAINING:**

- Show voltage indicator on electrodes (+V or -V)
- Animate ions drifting left or right based on voltage polarity
- Boundary shifts as ions move
- Resistance/weight value updates

**During INFERENCE:**

- Ions stay FIXED (weight doesn't change)
- Instead, animate current/electron flow through the device
- Show charge particles moving from input to output

### 2. Two Distinct Modes

**TRAINING MODE:**

- User provides multiple example calculations (e.g., 1×2=2, 3×2=6, 5×2=10)
- Network learns by adjusting weights via gradient descent
- Visualize: ions moving, boundary shifting, error decreasing
- Goal: Learn the PATTERN, not memorize one answer

**INFERENCE MODE (after training):**

- User enters ANY new input number
- Network computes result using the learned weight
- Visualize: current flowing through, math equation displayed
- Proves the network GENERALIZED (e.g., can compute 7×2=14 even though it only trained on 1,3,5)

### 3. Show the Math

Display the computation equation in real-time:

```
I = V × W
I = [input] × [learned weight]
I = [result]
```

Animate current flow from input through memristor to output, showing how the multiplication physically happens via conductance.

### 4. Training with Multiple Examples

Instead of training on just one calculation:

```
Training Examples:
  1 × 2 = 2
  3 × 2 = 6
  5 × 2 = 10
  100 x 2= 200
  ...

Network learns: Weight = 2.00

After training, test with NEW inputs:
  4 × 2 = ?  → Network outputs: 8  ✓
  7 × 2 = ?  → Network outputs: 14 ✓
  12 × 2 = ? → Network outputs: 24 ✓
```

The memristor learns the MULTIPLIER as its weight, then can multiply ANY number by it.

### 5. Operations to Support

| Operation          | What Weight Represents | Example                              |
| ------------------ | ---------------------- | ------------------------------------ |
| Addition (+)       | W=1 for both inputs    | 5+3: both contribute fully           |
| Subtraction (−)    | W=+1 and W=−1          | 5-3: add positive, subtract negative |
| Multiplication (×) | W = the multiplier     | 5×2: weight learns to be 2           |
| Division (÷)       | W = 1/divisor          | 10÷2: weight learns to be 0.5        |
| Power (^)          | Chain multiplications  | 2^3: multiply result repeatedly      |

---

## User Interface Layout

```
┌──────────────────────────────────────────────────────────────────┐
│  MEMRISTOR LEARNING SIMULATOR                                    │
├─────────────────────┬────────────────────────────────────────────┤
│ CONTROLS            │  PHYSICAL MEMRISTOR VIEW                   │
│                     │  ┌────────────────────────────────────┐    │
│ Operation: [×2 ▼]   │  │ [+V Electrode]                     │    │
│                     │  │  ●●●●●●○○○○○○○○○○○○○○○○○○○○○       │    │
│ Mode:               │  │  DOPED  │  UNDOPED                 │    │
│ ○ Training          │  │ [GND Electrode]                    │    │
│ ● Inference         │  └────────────────────────────────────┘    │
│                     │  Memristance: 5000Ω   Weight: 2.00         │
│ TRAINING DATA       │                                            │
│ ┌─────────────────┐ ├────────────────────────────────────────────┤
│ │ 1 × 2 = 2    ✓ │ │  COMPUTATION                               │
│ │ 3 × 2 = 6    ✓ │ │                                            │
│ │ 5 × 2 = 10   ✓ │ │  Input ──→ [MEMRISTOR] ──→ Output          │
│ │ [+ Add More]   │ │    7           W=2           14            │
│ └─────────────────┘ │                                            │
│                     │  I = V × W                                 │
│ [Auto-Generate]     │  I = 7 × 2.00                              │
│ [Train Network]     │  I = 14 ✓                                  │
│                     │                                            │
│ TEST INPUT          ├────────────────────────────────────────────┤
│ Input: [    7    ]  │  TRAINING LOG                              │
│ [Compute]           │  [Epoch 1] 1×2: W=0→1.5, error=0.5        │
│                     │  [Epoch 1] 3×2: W=1.5→1.9, error=0.1      │
│ Result: 14          │  [Epoch 2] Converged! W=2.00              │
└─────────────────────┴────────────────────────────────────────────┘
```

---

## Animation Requirements

### Training Animations:

1. Highlight current training example
2. Flash voltage on electrodes (+V/-V indicator)
3. Ions drift left or right (D3 transition, 500ms)
4. Boundary line shifts to new position
5. Weight number animates from old to new value
6. Error value decreases
7. Log entry appears

### Inference Animations:

1. Input value pulses/highlights
2. Current particles flow from input into memristor
3. Particles travel through the doped region
4. Particles exit to output node
5. Equation displays step by step
6. Result number animates in

### Key Difference:

- **Training** = ions MOVE (device is learning)
- **Inference** = ions STAY FIXED, current FLOWS (device is computing)

---

## Technical Implementation

**Single HTML file containing:**

- D3.js v7 via CDN
- Google Fonts (Orbitron for headers, Rajdhani for body)
- All CSS embedded in `<style>` tag
- All JavaScript embedded in `<script>` tag

**Color scheme (dark futuristic):**

- Background: #0a0e17 (deep blue-black)
- Panels: #121a2e (dark blue)
- Doped region: #00f5ff (cyan)
- Undoped region: #2a1a4a (dark purple)
- Ions: #ffaa00 (orange/yellow)
- Current flow: #00ff88 (green)
- Positive accent: #00ff88 (green)
- Negative accent: #ff00aa (magenta)

**Training algorithm (simple gradient descent):**

```javascript
for each epoch:
    for each example (inputA, expected):
        predicted = inputA * weight
        error = expected - predicted
        weight += learningRate * error * inputA
        // Animate ion movement proportional to weight change
    if totalError < threshold: break
```

---

## Success Criteria

The simulator is complete when:

1. ✓ Memristor shows electrodes, channel with doped/undoped regions, and visible ions
2. ✓ Ions animate and physically drift during training
3. ✓ Boundary position changes based on learned weight
4. ✓ Training uses MULTIPLE examples (not just one)
5. ✓ After training, user can test with ANY new input (generalization)
6. ✓ Current flow animates during inference (ions stay still)
7. ✓ Math equation (I = V × W = result) displays clearly
8. ✓ Training log shows step-by-step convergence
9. ✓ All operations work (+, −, ×, ÷, ^)
10. ✓ Clear visual distinction between Training and Inference modes

---

## Default Example

Load with multiplication (5 × 2) as the default operation, with pre-filled training examples:

- 1 × 2 = 2
- 3 × 2 = 6
- 5 × 2 = 10

After training completes, prompt user to test with new inputs like 4, 7, or 12 to prove generalization.

---

**Build this educational simulator showing how memristors physically learn and compute arithmetic through ion movement and current flow!**
