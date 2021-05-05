export default function waitForGlobal(name, timeout = 300) {
    return new Promise((resolve, reject) => {
      let waited = 0
  
      function wait(interval) {
        setTimeout(() => {
            // console.log("hey! called me?")
            // console.log(window.name);
          waited += interval
          // some logic to check if script is loaded
          // usually it something global in window object
          if (window[name] !== undefined) {
            //   console.log(window[name]+'\n\nloaded')
            return resolve()
          }
          if (waited >= timeout * 1000) {
              console.log('not yet')
            return reject({ message: 'Timeout' })
          }
          wait(interval * 2)
        }, interval)
      }
  
      wait(30)
    })
  }