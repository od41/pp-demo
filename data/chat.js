export const history = [
  {
    text: "Sports fan",
    sender: "user",
  },
  {
    details: {
      message:
        "Hello there! Welcome to PaulPlays, your ultimate hub for sports enthusiasts and gamers alike. Are you here for the thrill of sports, the excitement of gaming, or perhaps both?",
      response: {
        message:
          "Hello there! Welcome to PaulPlays, your ultimate hub for sports enthusiasts and gamers alike. Are you here for the thrill of sports, the excitement of gaming, or perhaps both?",
        intent: "sports_gamer",
        action_type: "buttons_list",
        multiselect: 0,
        buttons: [
          {
            label: "Sports Fan",
            value: "sports_fan",
          },
          {
            label: "Gamer",
            value: "gamer",
          },
          {
            label: "Both",
            value: "both",
          },
        ],
      },
      message_id: "098c154c-856c-4c99-a874-372601c8df30",
      answer_reached: true,
      chat_group_id: "33bbecb7-580b-4c78-b12c-eeb51889725a_736",
    },
    sender: "bot",
  },
  {
    details: {
      message:
        "That's fantastic! I can feel the excitement already. Could you share your name with me? It's always nice to know who I'm chatting with.",
      response: {
        message:
          "That's fantastic! I can feel the excitement already. Could you share your name with me? It's always nice to know who I'm chatting with.",
        intent: "ask_name",
        action_type: "default_message",
      },
      message_id: "8f8e316a-ea08-4a15-997c-6f71f941edbd",
      answer_reached: true,
      chat_group_id: "0188f408-98bc-4789-9914-400bda8c966c_156",
    },
    sender: "bot",
  },
  {
    text: "Nana",
    sender: "user",
  },
  {
    details: {
      message:
        "It's a pleasure to meet you, Nana! Before we dive into the world of sports, could you please accept our terms and conditions?",
      response: {
        message:
          "It's a pleasure to meet you, Nana! Before we dive into the world of sports, could you please accept our terms and conditions?",
        intent: "accept_terms",
        action_type: "buttons_list",
        multiselect: 0,
        buttons: [
          {
            label: "Accept",
            value: "accept",
            display_message: "I accept the terms and conditions",
          },
          {
            label: "Decline",
            value: "decline",
            display_message: "I decline the terms and conditions",
          },
        ],
      },
      message_id: "d8587602-6acd-4781-934f-b3026c7701d4",
      answer_reached: true,
      chat_group_id: "0188f408-98bc-4789-9914-400bda8c966c_156",
    },
    sender: "bot",
  },
  {
    text: "I accept the terms and conditions",
    sender: "user",
  },
  {
    details: {
      message:
        "Thank you for accepting our terms and conditions, Nana! Let's get started. Which sports are you interested in? Feel free to select more than one if you like.",
      response: {
        message:
          "Thank you for accepting our terms and conditions, Nana! Let's get started. Which sports are you interested in? Feel free to select more than one if you like.",
        intent: "interest_inquiry",
        action_type: "buttons_list",
        multiselect: 1,
        buttons: [
          {
            label: "Football",
            value: "football",
          },
          {
            label: "Basketball",
            value: "basketball",
          },
          {
            label: "Baseball",
            value: "baseball",
          },
          {
            label: "Volley",
            value: "volley",
          },
          {
            label: "A. Football",
            value: "a_football",
          },
          {
            label: "F1",
            value: "f1",
          },
          {
            label: "Track and Field",
            value: "track_and_field",
          },
          {
            label: "Tennis",
            value: "tennis",
          },
          {
            label: "Golf",
            value: "golf",
          },
        ],
      },
      message_id: "4d58245a-f4de-4ab4-8cdb-b722747be5df",
      answer_reached: true,
      chat_group_id: "0188f408-98bc-4789-9914-400bda8c966c_156",
    },
    sender: "bot",
  },
  {
    text: "Football",
    sender: "user",
  },
  {
    details: {
      message:
        "Nana, which game or match are you interested in attending? We have an exciting football event coming up:",
      response: {
        action_type: "cards",
        message:
          "Nana, which game or match are you interested in attending? We have an exciting football event coming up:",
        intent: "match_inquiry",
        cards: [
          {
            title:
              "EURO 2024 - UEFA Euro 2024 sees Europe's 24 best teams fight it out from June 15, with the final in Berlin on July 15",
            flag_1:
              "https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/UEFA_Euro_2024_Logo.svg/1200px-UEFA_Euro_2024_Logo.svg.png",
            flag_2:
              "https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/UEFA_Euro_2024_Logo.svg/1200px-UEFA_Euro_2024_Logo.svg.png",
          },
        ],
      },
      message_id: "24c56ab8-08a6-41e1-a57e-994bcec0f490",
      answer_reached: true,
      chat_group_id: "0188f408-98bc-4789-9914-400bda8c966c_156",
    },
    sender: "bot",
  },
  {
    text: "EURO 2024 - UEFA Euro 2024 sees Europe's 24 best teams fight it out from June 15, with the final in Berlin on July 15",
    sender: "user",
  },
  {
    details: {
      message: "Nana, which game or match are you interested in attending?",
      response: {
        action_type: "cards",
        message: "Nana, which game or match are you interested in attending?",
        intent: "match_inquiry",
        cards: [
          {
            title: "Albania vs Spain - Monday 24 June 2024, Dusseldorf",
            flag_1: "https://img.uefa.com/imgml/flags/70x70/ALB.png",
            flag_2: "https://img.uefa.com/imgml/flags/70x70/ESP.png",
          },
          {
            title: "Croatia vs Italy - Monday 24 June 2024, Leipzig",
            flag_1: "https://img.uefa.com/imgml/flags/70x70/CRO.png",
            flag_2: "https://img.uefa.com/imgml/flags/70x70/ITA.png",
          },
          {
            title: "England vs Slovenia - Tuesday 25 June 2024, Cologne",
            flag_1: "https://img.uefa.com/imgml/flags/70x70/ENG.png",
            flag_2: "https://img.uefa.com/imgml/flags/70x70/SVN.png",
          },
          {
            title: "Denmark vs Serbia - Tuesday 25 June 2024, Munich",
            flag_1: "https://img.uefa.com/imgml/flags/70x70/DEN.png",
            flag_2: "https://img.uefa.com/imgml/flags/70x70/SRB.png",
          },
        ],
      },
      message_id: "8fca571b-7636-4a0e-9674-79d4b87a4cc4",
      answer_reached: true,
      chat_group_id: "0188f408-98bc-4789-9914-400bda8c966c_156",
    },
    sender: "bot",
  },
  {
    text: "Croatia vs Italy - Monday 24 June 2024, Leipzig",
    sender: "user",
  },
  {
    details: {
      message:
        "Nana, that’s a great choice! What is your ticket and seating preference for the Croatia vs Italy match on Monday 24 June 2024 in Leipzig?",
      response: {
        action_type: "cards",
        intent: "ticket_inquiry",
        message:
          "Nana, that’s a great choice! What is your ticket and seating preference for the Croatia vs Italy match on Monday 24 June 2024 in Leipzig?",
        cards: [
          {
            title: "Prime Seats - 400 €",
            url_to_image: "seat_162_prime_seats400_.png",
          },
          {
            title: "Category 1 - 200 €",
            url_to_image: "seat_163_category_1200_.png",
          },
          {
            title: "Category 2 - 150 €",
            url_to_image: "seat_164_category_2150_.png",
          },
          {
            title: "Category 3 - 60 €",
            url_to_image: "seat_165_category_360_.png",
          },
          {
            title: "Fans First - 30 €",
            url_to_image: "seat_166_fans_first30_.png",
          },
        ],
      },
      message_id: "8b5037dd-9f7e-4db9-a5df-8c9159754662",
      answer_reached: true,
      chat_group_id: "0188f408-98bc-4789-9914-400bda8c966c_156",
    },
    sender: "bot",
  },
  {
    text: "Category 1 - 200 €",
    sender: "user",
  },
  {
    details: {
      message:
        "You've selected a Category 1 ticket for the Croatia vs Italy match on Monday 24 June 2024 in Leipzig, priced at 200 €. To proceed with your purchase, could you please sign up?",
      response: {
        message:
          "You've selected a Category 1 ticket for the Croatia vs Italy match on Monday 24 June 2024 in Leipzig, priced at 200 €. To proceed with your purchase, could you please sign up?",
        intent: "account_creation",
        ticket_selected: "Croatia vs Italy - Category 1 - 200 €",
        action_type: "buttons_list",
        multiselect: 0,
        buttons: [
          {
            label: "Create Account",
            value: "create_account",
          },
          {
            label: "Login",
            value: "login",
          },
        ],
      },
      message_id: "30e61723-892d-4417-91d7-16d853f2d9e0",
      answer_reached: true,
      chat_group_id: "0188f408-98bc-4789-9914-400bda8c966c_156",
    },
    sender: "bot",
  },
  {
    text: "I have signed up, proceed to buy Croatia vs Italy - Category 1 - 200 €",
    sender: "user",
  },
  {
    details: {
      message:
        "It looks like your current balance is 0.00 €, which isn't enough to purchase the ticket for Croatia vs Italy - Category 1 - 200 €. Would you like to top up your balance to proceed with the purchase?",
      response: {
        message:
          "It looks like your current balance is 0.00 €, which isn't enough to purchase the ticket for Croatia vs Italy - Category 1 - 200 €. Would you like to top up your balance to proceed with the purchase?",
        intent: "fund_wallet",
        action_type: "buttons_list",
        multiselect: 0,
        buttons: [
          {
            label: "Fund Wallet",
            value: "fund_wallet",
          },
        ],
      },
      message_id: "2f062516-14b4-4dbc-a5dd-ee57d1d65816",
      answer_reached: true,
      chat_group_id: "0188f408-98bc-4789-9914-400bda8c966c_156",
    },
    sender: "bot",
  },
];
