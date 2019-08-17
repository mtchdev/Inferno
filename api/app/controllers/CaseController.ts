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
        newCase.unix_added = Date.now() / 1000;
        newCase.unix_updated = Date.now() / 1000;

        await this.db.save(newCase);

        return this.respondWithSuccess({...newCase});
    }

    /**
     * Get all cases for a specific user
     * @param request The API request
     */
    async getCasesForUser(request: Request) {
        let params: any = request.params;

        let cases = await this.db.find(Case, {where: {user_id: params.uid}});
        return this.respondWithSuccess(cases);
    }

}
