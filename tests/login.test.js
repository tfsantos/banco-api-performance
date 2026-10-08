import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  iterations: 10,
  thresholds: {
    http_req_duration: ['p(90) < 1', 'max < 1'],
    http_req_failed: ['rate < 0.01']
  }
}

export default function () {
    const url = 'http://localhost:3000/api-docs/'
    const payload = JSON.stringify({
        username: 'julio.lima',
        senha: '123456'
    })
    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const resposta = http.post(url, payload, params)

    check (resposta, {
        'Validar que o Status é 200': (r) => r.status === 200
    })
    
    console.log (resposta)
}