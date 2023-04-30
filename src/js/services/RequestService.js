import {SERVERURL} from '../consts';

export default class RequestService {
    constructor() {

    };


    static async registrations(personName) {
        
        let request = fetch(`${SERVERURL}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body:JSON.stringify({personName})
        })

        let result = await request;
        let json = result.json();
        return json;
    }

    static async addMessage(personId, text) {
        const body = {personId, text};
        
        let request = fetch(`${SERVERURL}/message/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body:JSON.stringify(body)
        })

    }

    static async exit(personId) {
        let request = fetch(`${SERVERURL}/sign-out`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body:JSON.stringify({ personId })
        });

    }
}