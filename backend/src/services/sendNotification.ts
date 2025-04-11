import admin from "firebase-admin";

/**
 * Send push notification to a specific device using Firebase Cloud Messaging
 *
 * @param {{token: string}[]} rawTokens - FCM token of the target device
 * @param {string} title - Notification title
 * @param {string} body - Notification body text
 * @param {object} data - Optional custom data payload
 */
export const sendPushNotification = async (
  rawTokens: {token: string}[],
  title: string,
  body: string,
  data: any
) => {
  const stringData: Record<string, string> = {};
  Object.keys(data).forEach((key) => {
    stringData[key] = String(data[key]);
  });

  // 1. Extract token strings
  const tokens = rawTokens.map((item) => item.token);

  // 2. Split into batches of 499
  const chunkArray = <T>(arr: T[], size: number): T[][] => {
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const tokenChunks = chunkArray(tokens, 499);

  // 🔥 Now you can send each chunk using admin.messaging().sendMulticast()
  tokenChunks.forEach(async (chunk, index) => {
    console.log("chunk >>>", chunk);
    const message = {
      tokens: chunk,
      notification: {
        title: "Hello!",
        body: "This is a batched push notification 🚀",
      },
      data: stringData// optional custom data
    };

    try {
      const response = await admin.messaging().sendEachForMulticast(message);
     
      console.log(
        `✅ Batch ${index + 1} sent. Success: ${
          response.successCount
        }, Failure: ${response.failureCount}`
      );
    } catch (err) {
      console.error(`❌ Error in batch ${index + 1}:`, err);
    }
  });
};
