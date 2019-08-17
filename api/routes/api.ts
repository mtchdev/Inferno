import { Http, RouteResponses } from 'vendor/astro/router/http';
import { Response, Request } from 'express';
const http = new Http();

/**
 * Place your routes below. Example is provided using the Route provider
 */

import { GuildController } from 'app/controllers/GuildController';

http.post('guild', (req: Request, res: Response) => new GuildController(res).addGuild(req));
http.get('guild/:id', (req: Request, res: Response) => new GuildController(res).getConfig(req));

http.get('*', (req: Request, res: any) => {
    res.status(404).send(RouteResponses.NotFound(req));
});
