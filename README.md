# 🔋 HybridCare Pro v4.0 — Guía de Instalación

## 📁 Archivos del proyecto

```
hybridcare-pro/
├── index.html      ← App principal (toda la lógica + UI)
├── manifest.json   ← Config PWA (íconos, nombre, shortcuts)
└── sw.js           ← Service Worker (modo offline + notificaciones)
```

---

## 🚀 Cómo desplegar en tu GitHub Pages

1. Ve a tu repositorio: `rjmon563/hybridcare-pro`
2. **Reemplaza** el `index.html` existente con el nuevo
3. **Añade** `manifest.json` y `sw.js` en la misma carpeta raíz
4. Asegúrate de que GitHub Pages esté activo (Settings → Pages → main branch)
5. Espera ~2 min y visita `https://rjmon563.github.io/hybridcare-pro/`

---

## 📱 Instalar como App en el móvil

### Android (Chrome)
1. Abre la URL en Chrome
2. Aparecerá banner automático "Instalar HybridCare Pro"
3. Toca **Instalar** → la app aparece en tu pantalla de inicio

### iPhone/iPad (Safari)
1. Abre la URL en Safari
2. Toca el botón **Compartir** (⬆️)
3. Selecciona **"Añadir a pantalla de inicio"**
4. Toca **Añadir** → la app se instala como nativa

---

## ⚡ Permisos que solicita la app

| Permiso | Para qué |
|---------|----------|
| 📍 GPS | Velocidad GPS, tracking de ruta |
| 🔵 Bluetooth | Conexión adaptador OBD2 ELM327 |
| 🔔 Notificaciones | Alertas de mantenimiento y fallos |
| 📷 Cámara | Escanear código VIN del vehículo |
| 📳 Vibración | Alertas hápticas de urgencia |
| 💡 Pantalla activa | Mantener pantalla durante conducción |

---

## 🔌 Conexión OBD2

### Adaptadores compatibles
- **ELM327 Bluetooth** (recomendado) — Android/Chrome
- **ELM327 WiFi** — todos los dispositivos
- **Modo Demo** — sin adaptador, datos simulados

### Cómo conectar (Bluetooth)
1. Conecta el adaptador ELM327 al puerto OBD2 del coche
2. Enciende el motor o posición ACC
3. En la app → toca **OBD2** → **Conectar**
4. Selecciona **Bluetooth (ELM327)**
5. Elige tu dispositivo en la lista

> ⚠️ Web Bluetooth requiere Chrome en Android. En iOS usa WiFi.

---

## 🛠️ Funcionalidades principales

- ✅ **Dashboard** en tiempo real: SOC batería, RPM, velocidad, temperatura
- ✅ **Visualización de celdas** de batería HV individuales
- ✅ **Códigos DTC** activos, historial, freeze frame
- ✅ **GPS tracking** con velocidad, altitud y precisión
- ✅ **Asistente de voz** en español (comandos: "diagnóstico", "estado", "viaje"...)
- ✅ **Consumo** instantáneo y medio + eficiencia
- ✅ **Cálculo de ahorro** vs vehículo convencional y CO₂ evitado
- ✅ **Plan de mantenimiento** con alertas por km (10 tipos de servicio)
- ✅ **Historial de servicios** con coste acumulado
- ✅ **Backup/Restore** local en JSON
- ✅ **Informes exportables** en texto
- ✅ **Modo offline** — funciona sin internet tras primera carga
- ✅ **Notificaciones push** del sistema
- ✅ **Wake Lock** — pantalla activa conduciendo

---

## 🌐 Requisitos del navegador

| Feature | Chrome Android | Safari iOS | Firefox |
|---------|---------------|------------|---------|
| GPS | ✅ | ✅ | ✅ |
| BT OBD2 | ✅ | ❌ | ❌ |
| Instalar PWA | ✅ | ✅ (Safari) | ⚠️ |
| Notificaciones | ✅ | iOS 16.4+ | ✅ |
| Modo offline | ✅ | ✅ | ✅ |
| Voz | ✅ | ✅ | ❌ |
