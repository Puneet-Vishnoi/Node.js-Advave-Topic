const { spawn } = require('child_process');

function startApp() {
  const child = spawn('node', ['app.js'], {
    stdio: 'inherit',
    env: { ...process.env }
  });
  
  child.on('exit', (code) => {
    console.log(`Child exited with code ${code}`);
    if (code === 1) {
      console.log('Restarting app due to high CPU usage...');
      setTimeout(startApp, 2000); // restart after 2 seconds
    } else {
      console.log('App exited normally. Shutting down.');
      process.exit(code);
    }
  });
}

startApp();