import { Controller } from 'vendor/astro/http/Controller';
import { Request } from 'express';
import { Case, CaseTypes } from 'app/models/Case';
import { Note } from 'app/models/Note';

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
				newCase.guild_id = input.guild_id;

			console.log(newCase);
			console.log(input);

        await this.db.save(newCase);

        return this.respondWithSuccess({...newCase});
    }

    /**
     * Get all cases for a specific user
     * @param request The API request
     */
    async getCasesForUser(request: Request) {
				let params: any = request.params;

        let cases = await this.db.find(Case, {where: {user_id: params.uid, guild_id: params.guildId}});
				let notes = await this.db.count(Note, {where:{user_id: params.uid, guild_id: params.guildId}});
        return this.respondWithSuccess({cases: cases, notes: notes});
    }

    /**
     * Remove a case by ID
     * @param request The API request
     */
    async removeCase(request: Request) {
				let params: any = request.params;

        let exists = await this.db.findOne(Case, {where:{id: params.id, guild_id: params.guildId}});
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
            caseItem = await this.db.findOneOrFail(Case, {where:{id: item, guild_id: request.params.guildId}});
        } catch (e) {
            return this.respondWithError('CASE_NOT_FOUND');
        }

        this.respondWithSuccess(caseItem);
    }

    async editCase(request: Request) {
        let caseId: string = request.params.id;
        let reason: string = request.body.reason;
        let obj: Case;
       
        try {
					obj = await this.db.findOneOrFail(Case, {where:{id: caseId, guild_id: request.body.guild_id}});
        } catch (e) {
            return this.respondWithError('CASE_NOT_FOUND');
        }

        obj.reason = reason;
        this.db.save(obj);

        return this.respondWithSuccess();
    }

}
