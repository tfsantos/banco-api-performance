import http from 'k6/http'
import { check, sleep } from 'k6'
const postLogin = JSON.parse(open('../fixtures/postLogin.json'))

export const options = {
    /*stages: [
        { duration: '5s', target: 10 },
        { duration: '20s', target: 10 },
        { duration: '5s', target: 0 }
    ],*/
    iterations: 1,
    thresholds: {
        http_req_duration: ['p(90) < 3000', 'max < 5000'],
        http_req_failed: ['rate < 0.01']
    }
}

export default function () {
    const url = 'http://localhost:3000/api-docs/'
    
    console.log(postLogin)
    const payload = JSON.stringify(postLogin)
    
    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const resposta = http.post(url, payload, params)

    check (resposta, {
        'Validar que o Status é 200': (r) => r.status === 200
    })
    
    sleep(1)
}