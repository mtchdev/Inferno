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

    /**
     * Remove a case by ID
     * @param request The API request
     */
    async removeCase(request: Request) {
        let item: string = request.params.id;

        let exists = await this.db.findOne(Case, {where:{id: item}});
        if (!exists) {
            return this.respondWithError('CASE_NOT_FOUND');
        }

        await this.db.getRepository(Case).remove(exists);

        this.respondWithSuccess();
    }

    /**
     * Get a specific case
     * @param request The API request
     */
    async getCase(request: Request) {
        let item: string = request.params.id;
        let caseItem: Case;

        try {
            caseItem = await this.db.findOneOrFail(Case, {where:{id: item}});
        } catch (e) {
            return this.respondWithError('CASE_NOT_FOUND');
        }

        this.respondWithSuccess(caseItem);
    }

}
