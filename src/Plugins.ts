export interface Plugin {
    trigger: string;
    component: any
    canActivate?: any
}

/**
 * Import plugins
 */

import { TestCommand } from 'src/plugins/test';
import { SettingsCommand } from 'src/plugins/admin/Settings';
import { WarnCommand } from 'src/plugins/moderation/Warn';
import { CasesCommand } from 'src/plugins/moderation/Cases';
import { RemoveCaseCommand } from 'src/plugins/moderation/RemoveCase';
import { CaseCommand } from 'src/plugins/moderation/Case';
import { NoteCommand } from 'src/plugins/moderation/Note';
import { NotesCommand } from 'src/plugins/moderation/Notes';
import { RemoveNoteCommand } from 'src/plugins/moderation/RemoveNote';
import { ServerInfoCommand } from 'src/plugins/utility/ServerInfo';
import { HelpCommand } from 'src/plugins/utility/Help';
import { AddCommandCommand } from 'src/plugins/utility/AddCommand';
import { RemoveCommandCommand } from 'src/plugins/utility/RemoveCommand';
import { CustomCommandsCommand } from 'src/plugins/utility/Commands';
import { ClearCacheCommand } from 'src/plugins/utility/ClearCache';
import { UserInfoCommand } from './plugins/moderation/UserInfo';
import { KickCommand } from './plugins/moderation/Kick';
import { BanCommand } from './plugins/moderation/Ban';
import { UnbanCommand } from './plugins/moderation/Unban';
import { RemindCommand } from './plugins/utility/Remind';
import { ForceBanCommand } from './plugins/moderation/ForceBan';
import { PurgeCommand } from './plugins/moderation/Purge';
import { EightBallCommand } from './plugins/entertainment/8ball';
import { SoftBanCommand } from './plugins/moderation/SoftBan';

/**
 * Middleware
 */
import { IsAdmin } from 'src/util/middleware/IsAdmin';
import { IsModerator } from 'src/util/middleware/isModerator';
import { IsInfernoAdmin } from 'src/util/middleware/IsInfernoAdmin';

export const plugins: Array<Plugin> = [
    {
        trigger: 'test',
        component: TestCommand,
        canActivate: IsAdmin
    },
    {
        trigger: 'settings',
        component: SettingsCommand,
        canActivate: IsAdmin
    },
    {
        trigger: 'warn',
        component: WarnCommand,
        canActivate: IsModerator
    },
    {
        trigger: 'cases',
        component: CasesCommand,
        canActivate: IsModerator
    },
    {
        trigger: 'removecase',
        component: RemoveCaseCommand,
        canActivate: IsModerator
    },
    {
        trigger: 'case',
        component: CaseCommand,
        canActivate: IsModerator
    },
    {
        trigger: 'note',
        component: NoteCommand,
        canActivate: IsModerator
    },
    {
        trigger: 'notes',
        component: NotesCommand,
        canActivate: IsModerator
    },
    {
        trigger: 'removenote',
        component: RemoveNoteCommand,
        canActivate: IsModerator
    },
    {
        trigger: 'serverinfo',
        component: ServerInfoCommand,
        canActivate: IsAdmin
    },
    {
        trigger: 'help',
        component: HelpCommand
    },
    {
        trigger: 'addcommand',
        component: AddCommandCommand,
        canActivate: IsAdmin
    },
    {
        trigger: 'removecommand',
        component: RemoveCommandCommand,
        canActivate: IsAdmin
    },
    {
        trigger: 'commands',
        component: CustomCommandsCommand
    },
    {
        trigger: 'clearcache',
        component: ClearCacheCommand,
        canActivate: IsInfernoAdmin
    },
    {
        trigger: 'userinfo',
        component: UserInfoCommand,
        canActivate: IsModerator
    },
    {
        trigger: 'kick',
        component: KickCommand,
        canActivate: IsModerator
    },
    {
        trigger: 'ban',
        component: BanCommand,
        canActivate: IsModerator
    },
    {
        trigger: 'unban',
        component: UnbanCommand,
        canActivate: IsModerator
    },
    {
        trigger: 'remind',
        component: RemindCommand
    },
    {
        trigger: 'forceban',
        component: ForceBanCommand,
        canActivate: IsModerator
    },
    {
        trigger: 'purge',
        component: PurgeCommand,
        canActivate: IsModerator
    },
    {
        trigger: '8ball',
        component: EightBallCommand
    },
    {
        trigger: 'softban',
        component: SoftBanCommand,
        canActivate: IsModerator
    }
];
