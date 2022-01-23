export default function ({ route, redirect, req }) {
    const ua = (process.server ? req.headers['user-agent']: navigator.userAgent).match(/(Android|webOS|iPhone|iPod|tablet|BlackBerry|Mobile)/i);
    if (ua) {
        // return redirect('/m' + route.fullPath);
    }
  }