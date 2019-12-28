PS C:\Users\1673986\Desktop\lafarge-ce-express> node server
Listening on port 5000
request body  [ { userText: 'how can i rename you' } ]
api result on console :  Promise { <pending> }
responses[0].queryResult {
  fulfillmentMessages: [
    {
      platform: 'ACTIONS_ON_GOOGLE',
      basicCard: [Object],
      message: 'basicCard'
    },
    { platform: 'PLATFORM_UNSPECIFIED' },
    {
      platform: 'PLATFORM_UNSPECIFIED',
      text: [Object],
      message: 'text'
    }
  ],
  outputContexts: [],
  queryText: 'how can i rename you',
  speechRecognitionConfidence: 0,
  action: 'name.agent.change',
  parameters: {
    fields: {
      'given-name': [Object],
      'nick-name': [Object],
      type: [Object],
      'last-name': [Object]
    }
  },
  allRequiredParamsPresent: true,
  fulfillmentText: '',
  webhookSource: '',
  webhookPayload: null,
  intent: {
    inputContextNames: [],
    events: [],
    trainingPhrases: [],
    outputContexts: [],
    parameters: [],
    messages: [],
    defaultResponsePlatforms: [],
    followupIntentInfo: [],
    name: 'projects/agent-name-1-wkryvn/agent/intents/7c9bffde-bb0f-4ffa-841f-79b380020cb5',
    displayName: 'name.agent.change',
    priority: 0,
    isFallback: false,
    webhookState: 'WEBHOOK_STATE_UNSPECIFIED',
    action: '',
    resetContexts: false,
    rootFollowupIntentName: '',
    parentFollowupIntentName: '',
    mlDisabled: false
  },
  intentDetectionConfidence: 1,
  diagnosticInfo: null,
  languageCode: 'en',
  sentimentAnalysisResult: null
}
data :  [
  {
    Query: 'how can i rename you',
    Response: '',
    Intent: 'name.agent.change'
  }
]

