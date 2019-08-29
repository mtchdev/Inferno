export const COMMANDS: Array<Command> = [
    {
        name: 'help',
        description: 'Get a list of available commands.',
        level: 'everyone'
		},
    {
        name: 'warn @user [reason]',
        description: 'Warn a user.',
        level: 'moderator'
    },
    {
        name: 'ban @user [reason]',
        description: 'Ban a user from the server.',
        level: 'moderator'
    },
    {
        name: 'forceban [userId] [reason]',
        description: 'Force-ban a user if they\'ve left the server.',
        level: 'moderator'
    },
    {
        name: 'unban [userId]',
        description: 'Unban a user (by ID) from the server.',
        level: 'moderator'
    },
    {
        name: 'kick @user [reason]',
        description: 'Kick a user from the server.',
        level: 'moderator'
    },
    {
        name: 'mute @user|userId [time?] [reason]',
        description: 'Mute a user permanently, or temporarily with a relative time',
        level: 'moderator'
    },
    {
        name: 'unmute @user|userId',
        description: 'Unmute a user',
        level: 'moderator'
    },
    {
        name: 'softban @user [reason]',
        description: 'Kicks and removes all messages from a user, then unbans.',
        level: 'moderator'
    },
    {
        name: 'cases @user|userId',
        description: 'Get all cases for a user.',
        level: 'moderator'
    },
    {
        name: 'case [id]',
        description: 'Get a specific case by ID.',
        level: 'moderator'
    },
    {
        name: 'removecase [id]',
        description: 'Remove a case by it\'s ID.',
        level: 'moderator'
    },
    {
        name: 'note @user [note]',
        description: 'Add a note to a user.',
        level: 'moderator'
    },
    {
        name: 'notes @user|userId',
        description: 'Get notes for a user.',
        level: 'moderator'
    },
    {
        name: 'removenote [id]',
        description: 'Remove a note by it\'s ID.',
        level: 'moderator'
    },
    {
        name: 'settings',
        description: 'Change the guild settings.',
        level: 'admin'
    },
    {
        name: 'serverinfo',
        description: 'Get all information for the guild.',
        level: 'admin'
    },
    {
        name: 'addcommand [trigger] [response]',
        description: 'Add a custom command.',
        level: 'admin'
    },
    {
        name: 'removecommand [commandName]',
        description: 'Remove a custom command.',
        level: 'admin'
    },
    {
        name: 'commands',
        description: 'Get all available custom commands.',
        level: 'everyone'
    },
    {
        name: 'userinfo @user|userId',
        description: 'Get specific user information.',
        level: 'moderator'
    },
    {
        name: 'remind [time] @user? [message]',
        description: 'Remind a user (or self) in the current channel.',
        level: 'everyone'
    },
    {
        name: 'purge [count]',
        description: 'Bulk-delete (purge) a number of messages.',
        level: 'moderator'
    },
    {
        name: '8ball [question]',
        description: 'Ask the magic 8ball.',
        level: 'everyone'
    },
    {
        name: 'coinflip',
        description: 'Flip a coin!',
        level: 'everyone'
    },
    {
        name: 'version',
        description: 'Get the current Inferno version.',
        level: 'everyone'
    },
    {
        name: 'whereis @user|userId',
        description: 'Find which voice channel a user is in.',
        level: 'moderator'
    },
    {
        name: 'move @user|userId',
        description: 'Move a user to another voice channel.',
        level: 'moderator'
    },
    {
        name: 'suggest [message]',
        description: 'Send a suggestion to the developers.',
        level: 'everyone'
    }
];

export type PermissionLevels = 'admin' | 'moderator' | 'everyone';

export interface Command {
    name: string;
    description: string;
    level: PermissionLevels;
}
