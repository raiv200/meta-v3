import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL);

export default sql;

/// User Accounts Query  /////

export async function getAllUserAccount() {
  const userdata = await sql`
     SELECT * from  user_account
    `;

  return userdata;
}

export async function getUserAccount(email) {
  const userdata = await sql`
     SELECT * from  user_account WHERE email = ${email}
    `;

  return userdata;
}

export async function insertUserAccount(newUser) {
  const userdata = await sql`
  INSERT INTO user_account ${sql(newUser, "id", "username", "email")}`;

  return userdata;
}

export async function deleteUserAccount(email) {
  const userdata = await sql`
  DELETE from user_account WHERE email = ${email}`;

  return userdata;
}

// export async function getUserMetaAccount(userId) {
//   const userdata = await sql`
//      SELECT * from  user_meta_account WHERE id = ${userId}
//     `;

//   return userdata;
// }


// export async function insertUserMetaAccount(newUser) {
//   const userdata = await sql`
//   INSERT INTO user_meta_account ${sql(
//     newUser,
//     "id",
//     "email",
//     "password",
//     "api_key",
//     "is_connected"
//   )}`;

//   return userdata;
// }


//// User Sub Accounts Query //////

export async function getUserSubAccounts(userId) {
  const userdata = await sql`
        SELECT * FROM user_sub_account WHERE user_id = ${userId} ORDER BY created_at
    `;

  return userdata;
}
export async function getUserSubAccountsByAccountId(accountId) {
  const userdata = await sql`
        SELECT * FROM user_sub_account WHERE account_id = ${accountId}
    `;

  return userdata;
}

export async function insertUserSubAccountInfo(newUserAccountInfo) {
  const data = await sql`
  INSERT INTO user_sub_account ${sql(
    newUserAccountInfo,
    "account_id",
    "user_id",
    "state",
    "password",
    "account_type",
    "region",
    "broker",
    "currency",
    "server",
    "balance",
    "equity",
    "margin",
    "free_margin",
    "leverage",
    "type",
    "name",
    "login",
    "credit",
    "platform",
    "trade_allowed",
    "margin_mode",
    "investor_mode",
    "account_currency_exchange_rate",
    "magic",
    "account_name",
    "connection_status",
    "quote_streaming_interval_in_seconds",
    "reliability",
    "tags",
    "resource_slots",
    "copy_factory_resource_slots",
    "version",
    "hash",
    "copy_factory_roles",
    "application",
    "created_at",
    "primary_replica",
    "account_replicas",
    "connections"
  )}
  `;
  return data;
}

export async function updateUserSubAccountInfo(
  accountId,
  name,
  server,
  region,
  platform,
  type,
  magic,
  copyFactoryRoles,
  balance,
  equity,
  freeMargin
) {
  const data = await sql`
  UPDATE user_sub_account
  SET account_name = ${name}, 
  platform = ${platform}, 
  region = ${region}, 
  server = ${server}, 
  account_type = ${type} , 
  magic = ${magic} ,
  copy_factory_roles = ${copyFactoryRoles} , 
  balance = ${balance},
  equity = ${equity},
  free_margin = ${freeMargin}
  WHERE account_id = ${accountId}`;

  return data;
}

export async function updateUserSubAccountConnection(
  accountId,
  newState,
  connection
) {
  const data = await sql`
  UPDATE user_sub_account
  SET state = ${newState}, connection_status = ${connection}
  WHERE account_id = ${accountId}`;

  return data;
}

export async function updateAllSubAccountsConnection(
  userId,
  newState,
  connection
) {
  const data = await sql`
  UPDATE user_sub_account
  SET state = ${newState}, connection_status = ${connection}
  WHERE user_id = ${userId}`;

  return data;
}

export async function deleteUserSubAccountInfo(accountId) {
  const data = await sql`
  DELETE FROM user_sub_account
  WHERE account_id = ${accountId}`;

  return data;
}

//// User Trade History Query //////

export async function getAllUserTradeHistory(userId) {
  const userdata = await sql`
        SELECT * FROM user_trade_history WHERE user_id = ${userId} ORDER BY time DESC
    `;

  return userdata;
}

export async function getUserTradeHistoryByAccountId(accountId) {
  const userdata = await sql`
        SELECT * FROM user_trade_history WHERE account_id = ${accountId} ORDER BY time DESC
    `;

  return userdata;
}

export async function insertUserTradeHistory(tradeHistory) {
  const userdata = await sql`
  INSERT INTO user_trade_history ${sql(
    tradeHistory,
    "user_id",
    "account_id",
    "account_name",
    "deal_id",
    "platform",
    "type",
    "time",
    "broker_time",
    "commission",
    "swap",
    "profit",
    "symbol",
    "magic",
    "order_id",
    "position_id",
    "volume",
    "price",
    "entry_type",
    "reason",
    "account_currency_exchange_rate"
  )}`;

  return userdata;
}

//// User Order History Query //////

export async function getAllUserOrdersHistory(userId) {
  const userdata = await sql`
        SELECT * FROM user_order_history WHERE user_id = ${userId} ORDER BY time DESC
    `;

  return userdata;
}


export async function getUserOrdersHistoryByAccountId(accountId) {
  const userdata = await sql`
        SELECT * FROM user_order_history WHERE account_id = ${accountId} ORDER BY time DESC
    `;

  return userdata;
}

export async function insertUserOrdersHistory(orderHistory) {
  const userdata = await sql`
  INSERT INTO user_order_history ${sql(
    orderHistory,
    "user_id",
    "account_id",
    "account_name",
    "order_id",
    "platform",
    "type",
    "state",
    "symbol",
    "magic",
    "time",
    "broker_time",
    "open_price",
    "volume",
    "current_volume",
    "position_id",
    "done_time",
    "done_broker_time",
    "reason",
    "filling_mode",
    "expiration_type",
    "account_currency_exchange_rate"
  )}`;

  return userdata;
}

//// User Trade Strategy Query //////

export async function getUserTradeStrategy(userId) {
  const userdata = await sql`
        SELECT * FROM user_trade_strategy WHERE user_id = ${userId} ORDER BY created_at
    `;

  return userdata;
}

export async function insertUserTradeStrategy(userTradeStrategyData) {
  const userdata = await sql`
  INSERT INTO user_trade_strategy ${sql(
    userTradeStrategyData,
    "user_id",
    "account_id",
    "strategy_id",
    "strategy_name",
    "strategy_description",
    "created_at"
  )}
    `;

  return userdata;
}

export async function updateUserTradeStrategy(
  strategyId,
  newStrategyName,
  newStrategyDescription
) {
  const userdata = await sql`
  UPDATE user_trade_strategy
  SET strategy_name = ${newStrategyName}, strategy_description = ${newStrategyDescription}
  WHERE strategy_id = ${strategyId}`;

  return userdata;
}

export async function deleteUserTradeStrategy(strategyId) {
  const userdata = await sql`
  DELETE FROM user_trade_strategy
  WHERE strategy_id = ${strategyId}`;

  return userdata;
}




//// User Positions Data Query //////

// export async function getAllUserLivePositionData(userId) {
//   const userdata = await sql`
//   SELECT *
//   FROM user_live_positions 
//   WHERE user_id = ${userId}
//     `;

//   return userdata;
// }

// export async function getUserLivePositionByAccountId(accountId) {
//   const userdata = await sql`
//      SELECT * from  user_live_positions where account_id = ${accountId}
//     `;

//   return userdata;
// }

// export async function getUserLivePositionById(positionId) {
//   const userdata = await sql`
//      SELECT * from  user_live_positions where position_id = ${positionId} ORDER BY time DESC
//     `;

//   return userdata;
// }

// export async function insertNewUserLivePositions(userLivePositions) {
//   // Array
//   const data = await sql`
//   INSERT INTO user_live_positions ${sql(
//     userLivePositions,
//     "user_id",
//     "account_id",
//     "position_id",
//     "platform",
//     "position_type",
//     "symbol",
//     "magic",
//     "time",
//     "broker_time",
//     "update_time",
//     "open_price",
//     "volume",
//     "swap",
//     "commission",
//     "realized_swap",
//     "realized_commission",
//     "unrealized_swap",
//     "unrealized_commission",
//     "reason",
//     "current_price",
//     "current_tick_value",
//     "realized_profit",
//     "unrealized_profit",
//     "profit",
//     "account_currency_exchange_rate",
//     "update_sequence_number"
//   )}
//   `;
//   return data;
// }

// export async function updateLivePositionsById(positionId, data) {
//   const userdata = await sql`
//      UPDATE user_live_positions
//      SET 
//   position_type = ${data.position_type},
//   symbol = ${data.symbol},
//   magic = ${data.magic},
//   time = ${data.time},
//   broker_time = ${data.broker_time},
//   update_time = ${data.update_time},
//   open_price = ${data.open_price},
//   volume = ${data.volume},
//   swap = ${data.swap},
//   commission = ${data.commission},
//   realized_swap = ${data.realized_swap},
//   realized_commission = ${data.realized_commission},
//   unrealized_swap = ${data.unrealized_swap},
//   unrealized_commission = ${data.unrealized_commission},
//   reason = ${data.reason},
//   current_price = ${data.current_price},
//   current_tick_value = ${data.current_tick_value},
//   realized_profit = ${data.realized_profit},
//   unrealized_profit = ${data.unrealized_profit},
//   profit = ${data.profit},
//   account_currency_exchange_rate = ${data.account_currency_exchange_rate},
//   update_sequence_number = ${data.update_sequence_number}
//      WHERE position_id = ${positionId}
//     `;

//   return userdata;
// }

// export async function deleteLivePositionsById(positionId) {
//   const userdata = await sql`
//      DELETE  from  user_live_positions where position_id = ${positionId}
//     `;

//   return userdata;
// }





/// User Open Orders Query  /////

// export async function getAllUserOpenOrdersData(userId) {
//   const userdata = await sql`
//   SELECT *
//   FROM user_open_orders 
//   WHERE user_id = ${userId}
//     `;

//   return userdata;
// }

// export async function getUserOpenOrdersByAccountId(accountId) {
//   const userdata = await sql`
//      SELECT * from  user_open_orders where account_id = ${accountId} ORDER BY time DESC
//     `;

//   return userdata;
// }

// export async function getUserOpenOrdersById(orderId) {
//   const userdata = await sql`
//      SELECT * from  user_open_orders where order_id = ${orderId}
//     `;

//   return userdata;
// }

// export async function insertNewUserOpenOrders(userOpenOrders) {
//   // Array
//   const data = await sql`
//   INSERT INTO user_live_positions ${sql(
//     userOpenOrders,
//     "user_id",
//     "account_id",
//     "order_id",
//     "platform",
//     "order_type",
//     "state",
//     "symbol",
//     "magic",
//     "time",
//     "broker_time",
//     "open_price",
//     "volume",
//     "current_volume",
//     "position_id",
//     "reason",
//     "current_price",
//     "account_currency_exchange_rate",
//     "update_sequence_number"
//   )}
//   `;
//   return data;
// }

// export async function updateOpenOrdersById(orderId, data) {
//   const userdata = await sql`
//      UPDATE user_open_orders 
//      SET 
    
//      order_type = ${data.order_type},
//      state = ${data.state},
//      symbol = ${data.symbol},
//      magic = ${data.magic},
//      time = ${data.time},
//      broker_time = ${data.broker_time},
//      open_price = ${data.open_price},
//      volume = ${data.volume},
//      current_volume = ${data.current_volume},
//      position_id = ${data.position_id},
//      reason = ${data.reason},
//      current_price = ${data.current_price},
//      account_currency_exchange_rate = ${data.account_currency_exchange_rate},
//      update_sequence_number = ${data.update_sequence_number}
//      WHERE order_id = ${orderId}
//     `;

//   return userdata;
// }

// export async function updateOpenOrdersState(orderId, state) {
//   const userdata = await sql`
//      UPDATE user_open_orders 
//      SET state = ${state}
//      WHERE order_id = ${orderId}
//     `;

//   return userdata;
// }

// export async function deleteOpenOrdersById(orderId) {
//   const userdata = await sql`
//      DELETE  from  user_open_orders where order_id = ${orderId}
//     `;

//   return userdata;
// }
