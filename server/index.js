#!/usr/bin/env node

import store from './store';
import {startServer} from './actions';

store.dispatch(startServer());
