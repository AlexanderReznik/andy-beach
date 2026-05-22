# Will Andy play beach volleyball?

A simple web app that predicts whether Andy will play beach volleyball each day for the next week, based on London's weather forecast.

Andy plays when all three conditions are met:
- Temperature above 25°C
- No rain
- Wind speed below 30 km/h

Weather data comes from [Open-Meteo](https://open-meteo.com/) — free, no API key required.

**Live:** https://andy-beach.vercel.app

<img width="1974" height="1890" alt="image" src="https://github.com/user-attachments/assets/8e4162fc-b509-44b0-8600-8ba0b7dadadb" />

## Development

```bash
npm install        # install dependencies
npm run dev        # start dev server at http://localhost:5173
npm test           # run tests
npm run build      # production build
npm run preview    # preview production build locally
```
