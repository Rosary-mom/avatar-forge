import numpy as np
import matplotlib.pyplot as plt

height = 1.87
x = np.linspace(-0.4, 0.4, 600)
y = np.linspace(height*0.75, height*1.15, 400)
X, Y = np.meshgrid(x, y)

# Cobain waves + grey streaks
waves = 0.07 * np.sin(25*X + Y*3) * np.exp(-4*(X)**2)
grey = 0.3 * np.sin(40*X) * np.exp(-3*(Y-height))
hair = np.clip(waves + grey + 0.6, 0, 1)

plt.figure(figsize=(8,10))
plt.contourf(X, Y, hair, levels=30, cmap='Greys', alpha=0.9)
plt.axis('off')
plt.savefig("../dist/generated/hair-silhouette.svg", bbox_inches='tight', pad_inches=0, transparent=True)
plt.close()
