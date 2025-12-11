import numpy as np
import matplotlib.pyplot as plt
import os
import matplotlib
matplotlib.use('Agg')  # ADD THIS: Headless backend for Netlify
os.makedirs("../dist/generated", exist_ok=True)  # ADD THIS: Ensure folder exists

# Your body measures
height = 1.87
width = 0.55

x = np.linspace(-width, width, 800)
y = np.linspace(0, height*1.1, 1000)
X, Y = np.meshgrid(x, y)

# Quantum traffic cross (your DNA)
center = np.exp(-((X-0.01)**2 + (Y-height*0.6)**2)/0.03) + \
         np.exp(-((X+0.01)**2 + (Y-height*0.6)**2)/0.03)
arms = np.exp(-((X)**2 + (Y-height*0.6 - 0.3)**2)/0.02) * 1.5
cross = np.clip(center + arms, 0, 1)

plt.figure(figsize=(8,10))
plt.imshow(1-cross, cmap='binary', extent=[-width,width,height*1.1,0])
plt.axis('off')
plt.savefig("../dist/generated/cape-pattern.svg", bbox_inches='tight', pad_inches=0, transparent=True)  # Updated path
plt.close()
