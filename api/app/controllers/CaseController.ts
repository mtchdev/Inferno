import { Controller } from 'vendor/astro/http/Controller';
import { Request } from 'express';
import { Case, CaseTypes } from 'app/models/Case';

export class CaseController extends Controller {
    
    constructor(data) {
        super(data);
    }
    
    /**
     * Add a case for a user
     * @param request The API request
     */
    async addCase(request: Request) {
        let input: any = request.body;

        let newCase = new Case();
        newCase.type = <CaseTypes>input.type;
        newCase.user_id = input.user_id;
        newCase.actor_id = input.actor_id;
        if (input.reason) {
            newCase.reason = input.reason;
        }
        newCase.unix_added = Date.now();
        newCase.unix_updated = Date.now();

        await this.db.save(newCase);

        return this.respondWithSuccess({...newCase});
    }

}
