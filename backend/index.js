import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use((req,res,next) => {
    res.set('Access-Control-Allow-Origin', 'http://127.0.0.1:5500/');
    res.set('Access-Control-Allow-Methods', 'GET,POST,PUT');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Allow-Credentials', 'true');
    return next();
});

const port = process.env.port || 3303;
app.listen(port, () => {
    console.log(`app is listening on port: ${port}`);
})

function add(a, b) {
    return a + b;
  }
  
  function subtract(a, b) {
    if (a < b) {
      return `Result must be positive...`;
    }
    return a - b;
  }
  
  function multiply(a, b) {
    return a * b;
  }
  
  function divide(a, b) {
    if (b === 0) {
      return `Can't divide by zero...`;
    }
    return a / b;
  }
  
  let mathFunctions = {
    'add': add,
    'multiply': multiply,
    'divide': divide,
    'subtract': subtract
  };

  let db = {
    'player1': {lastResult: 0},
    'player2': {lastResult: 0}
  };


  app.put('/player/:functionName', (request, response) => {
    let fn = mathFunctions[request.params.functionName];
    let playerId = request.headers.cookie.split('=')[1];
    let {inputNumber, playedId} = request.body;
    let {lastResult} = db[playedId];
    let result = fn(lastResult, inputNumber);

    db[playedId].lastResult=result; 

    response.json({
        result 
    })
  })

  app.post('player/choice', (request, response) => {
    let {playerId} = request.body;
    response.set('Set-Cookie', `playerId=${palyedId}; Path=/;`);
    response.json({
        message: `You have chosen player [${playerId}]`
    });
  });
