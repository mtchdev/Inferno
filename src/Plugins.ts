export interface Plugin {
    trigger: string;
    component: any;
    canActivate?: any;
    permissions?: Array<PermissionResolvable>;
    permissionRule?: 'or' | 'all';
    alias?: Array<string>;
}

/**
 * Import plugins
 */

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
import { DebugCommand } from './plugins/utility/Debug';
import { VersionCommand } from './plugins/utility/Version';
import { CoinFlipCommand } from './plugins/entertainment/CoinFlip';
import { WhereIsCommand } from './plugins/moderation/WhereIs';
import { MoveCommand } from './plugins/moderation/Move';
import { SuggestCommand } from './plugins/utility/Suggest';
import { SupportCommand } from './plugins/utility/Support';
import { MuteCommand } from './plugins/moderation/Mute';
import { UnmuteCommand } from './plugins/moderation/Unmute';
import { NickCommand } from './plugins/moderation/Nick';

/**
 * Middleware
 */
import { IsAdmin } from 'src/util/middleware/IsAdmin';
import { IsModerator } from 'src/util/middleware/isModerator';
import { IsInfernoAdmin } from 'src/util/middleware/IsInfernoAdmin';
import { PermissionResolvable } from 'discord.js';

export const plugins: Array<Plugin> = [
    {
        trigger: 'settings',
        component: SettingsCommand,
        canActivate: IsAdmin,
        permissions: ['MANAGE_GUILD'],
        permissionRule: 'or'
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
        permissions: ['ADMINISTRATOR'],
        permissionRule: 'or'
    },
    {
        trigger: 'help',
        component: HelpCommand
    },
    {
        trigger: 'addcommand',
        component: AddCommandCommand,
        canActivate: IsAdmin,
        alias: ['addcmd']
    },
    {
        trigger: 'removecommand',
        component: RemoveCommandCommand,
        canActivate: IsAdmin,
        alias: ['removecmd']
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
        canActivate: IsModerator,
        permissions: ['KICK_MEMBERS'],
        permissionRule: 'or'
    },
    {
        trigger: 'ban',
        component: BanCommand,
        canActivate: IsModerator,
        permissions: ['BAN_MEMBERS'],
        permissionRule: 'or'
    },
    {
        trigger: 'unban',
        component: UnbanCommand,
        canActivate: IsModerator,
        permissions: ['BAN_MEMBERS'],
        permissionRule: 'or'
    },
    {
        trigger: 'remind',
        component: RemindCommand
    },
    {
        trigger: 'forceban',
        component: ForceBanCommand,
        canActivate: IsModerator,
        permissions: ['BAN_MEMBERS'],
        permissionRule: 'or'
    },
    {
        trigger: 'purge',
        component: PurgeCommand,
        canActivate: IsModerator,
        permissions: ['MANAGE_MESSAGES'],
        permissionRule: 'or'
    },
    {
        trigger: '8ball',
        component: EightBallCommand
    },
    {
        trigger: 'softban',
        component: SoftBanCommand,
        canActivate: IsModerator,
        permissions: ['BAN_MEMBERS'],
        permissionRule: 'or'
    },
    {
        trigger: 'debug',
        component: DebugCommand,
        canActivate: IsInfernoAdmin,
        alias: ['db']
    },
    {
        trigger: 'version',
        component: VersionCommand
    },
    {
        trigger: 'coinflip',
        component: CoinFlipCommand
    },
    {
        trigger: 'whereis',
        component: WhereIsCommand,
        canActivate: IsModerator
    },
    {
        trigger: 'move',
        component: MoveCommand,
        canActivate: IsModerator,
        permissions: ['MOVE_MEMBERS'],
        permissionRule: 'or',
        alias: ['mv']
    },
    {
        trigger: 'suggest',
        component: SuggestCommand
    },
    {
        trigger: 'support',
        component: SupportCommand
    },
    {
        trigger: 'mute',
        component: MuteCommand,
        canActivate: IsModerator
    },
    {
        trigger: 'unmute',
        component: UnmuteCommand,
        canActivate: IsModerator
    },
    {
        trigger: 'nick',
        component: NickCommand,
        canActivate: IsModerator,
        permissions: ['MANAGE_NICKNAMES'],
        permissionRule: 'or',
        alias: ['nickname']
    }
];
