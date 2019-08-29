import { Controller } from 'vendor/astro/http/Controller';
import { Request } from 'express';
import { TempMute } from 'app/models/TempMute';

export class MuteController extends Controller {
    
    constructor(data) {
        super(data);
    }

    /**
     * Add a temp-mute
     * @param request The API request
     * @returns TempMute
     */
    async addTempMute(request: Request) {
        let input: any = request.body;

        let mute = new TempMute();
        mute.guild_id = input.guild_id;
        mute.time = input.time;
        mute.user_id = input.user_id;

        await this.db.save(mute);
        return this.respondWithSuccess(mute);
    }

    /**
     * Get all temp mutes
     * @returns Array<TempMute>
     */
    async getAllTempMutes() {
        let mutes = await this.db.getRepository(TempMute).createQueryBuilder('mute').getMany();
        return this.respondWithSuccess(mutes);
    }

    async removeMute(request: Request) {
        let id: string = request.params.id;

        try {
            let mute: TempMute = await this.db.findOneOrFail(TempMute, id);
            await this.db.getRepository(TempMute).remove(mute);
        } catch (e) {
            return this.respondWithError(e);
        }

        return this.respondWithSuccess();
    }

}
