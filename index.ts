/**
 * Import everything
 */

import { Client } from 'discord.js';
import { Spawner } from 'src/Spawner';
import { instance } from 'src/util/Instance';
import EventHandler from 'src/events/EventHandler';
require('dotenv').config();

/**
 * Spawn
 */

const APP: Client = new Client();
Spawner.spawn(APP);
instance['app'] = APP;

new EventHandler(APP);
