import { Http, RouteResponses } from 'vendor/astro/router/http';
import { Response, Request } from 'express';
const http = new Http();

/**
 * Place your routes below. Example is provided using the Route provider
 */

import { GuildController } from 'app/controllers/GuildController';
import { CaseController } from 'app/controllers/CaseController';

http.post('guild', (req: Request, res: Response) => new GuildController(res).addGuild(req));
http.get('guild/:id', (req: Request, res: Response) => new GuildController(res).getConfig(req));

// Settings
http.post('guild/prefix', (req: Request, res: Response) => new GuildController(res).setPrefix(req));
http.post('guild/:id/roles/mod', (req: Request, res: Response) => new GuildController(res).setModRole(req));

// Cases
http.post('case', (req: Request, res: Response) => new CaseController(res).addCase(req));
http.get('case/:id', (req: Request, res: Response) => new CaseController(res).getCase(req));
http.put('case/:id', (req: Request, res: Response) => new CaseController(res).editCase(req));
http.delete('case/:id', (req: Request, res: Response) => new CaseController(res).removeCase(req));
http.get('cases/:uid', (req: Request, res: Response) => new CaseController(res).getCasesForUser(req));

http.get('*', (req: Request, res: any) => {
    res.status(404).send(RouteResponses.NotFound(req));
});
