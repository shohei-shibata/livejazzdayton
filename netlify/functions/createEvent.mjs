import axios from "axios";
import moment from "moment-timezone";
export default async (req, context) => {
  const listIdUnapprovedEvents = "6325995bfd858d013807a56d"
  const trelloKey = process.env.TRELLO_API_KEY
  const trelloToken = process.env.TRELLO_API_TOKEN
  const createEventUrl = `https://api.trello.com/1/cards?idList=${listIdUnapprovedEvents}&key=${trelloKey}&token=${trelloToken}`
  /*async function addAddress(cardId, {address, locationName}) {
    const addAddressUrl = `https://api.trello.com/1/cards/${cardId}?key=${trelloKey}&token=${trelloToken}`
    return await axios.put(addAddressUrl, {
      address: address,
      locationName: locationName
    })
    .then(res => {
      console.log("ADDRESS SUCCESS")
      return res
    })
    .catch(err => {
      console.log("ADDRESS ERROR")
      return err
    })
  }*/
  async function addAttachment(cardId, { imageUrl }) {
    const addAttachmentUrl = `https://api.trello.com/1/cards/${cardId}/attachments?key=${trelloKey}&token=${trelloToken}`
    return await axios.post(addAttachmentUrl, {
      url: imageUrl
    })
    .then(res => {
      return res
    })
    .catch(err => {
      console.log("ATTACHMENT ERROR", err)
      return err
    })
  }
  async function addCustomFields(cardId, {
      start, 
      artists, 
      websiteUrl, 
      ticketUrl, 
      duration,
      address,
      locationName
    }) {
    const addCustomFieldsUrl = `https://api.trello.com/1/cards/${cardId}/customFields?key=${trelloKey}&token=${trelloToken}`
    return await axios.put(addCustomFieldsUrl, {
      customFieldItems: [
        {
          idCustomField: "63298cde0d12540117f3fa32",
          value: {
            date: start
          }
        },
        {
          idCustomField: "63298eb14e9a4702d35dbd47",
          value: {
            text: artists
          }
        },
        {
          idCustomField: "63298de3f0b71701cee74d9b",
          value: {
            text: websiteUrl
          }
        },
        {
          idCustomField: "6333522eae22aa02e35a6c7c",
          value: {
            text: ticketUrl
          }
        },
        {
          idCustomField: "65b2354348c7c7168e48ee14",
          value: {
            number: duration.toString()
          }
        },
        {
          idCustomField: "65bfd9569b44900a7431df0d",
          value: {
            text: `${locationName} ${address}`
          }
        },
      ]
    })
    .then(res => {
      return res
    })
    .catch(err => {
      console.log("CUSTOM FIELDS ERROR", err)
      return err
    })
  }
  async function addComment(cardId, { text }) {
    const addAttachmentUrl = `https://api.trello.com/1/cards/${cardId}/actions/comments?text=${text}&key=${trelloKey}&token=${trelloToken}`
    return await axios.post(addAttachmentUrl, {})
    .then(res => {
      return res
    })
    .catch(err => {
      console.log("COMMENT ERROR", err)
      return err
    })
  }
  
  const res = await req.formData().then(async data => {
    let eventData = {}
    for (const pair of data.entries()) {
      if (pair[0] !== "submit") {
        eventData = {
          [pair[0]]: pair[1],
          ...eventData
        }
      }
    }
    const { 
      name, 
      desc, 
      address, 
      locationName, 
      start, 
      artists, 
      websiteUrl, 
      ticketUrl, 
      hours,
      minutes,
      imageUrl,
      username,
      email
    } = eventData
    const duration = parseInt(hours) + parseInt(minutes) / 60
    const startAdjusted = moment.tz(start.replace("T", " "), "America/Detroit")
    return await axios.post(createEventUrl, {
      name,
      desc,
    })
    .then(async function (response) {
      const secondResponse = await Promise.all([
        /*addAddress(response.data.id, {
          address,
          locationName
        }), */
        addCustomFields(response.data.id, {
          start: startAdjusted,
          artists,
          websiteUrl,
          ticketUrl,
          duration,
          address,
          locationName
        }),
        imageUrl && addAttachment(response.data.id, {
          imageUrl
        }),
        addComment(response.data.id, {
          text: `Created by ${username} <${email}>`
        })
      ])
      .then(res => {
        return res
      })
      .catch(err => {
        console.log("SECONDARY REQUEST ERROR", err)
        return err
      })
      const error = secondResponse.find(item => item.status !== 200)
      if (error) {
        return error
      }
      return {
        status: 200
      }
    })
    .catch(function (error) {
      console.log("ERROR", error);
      return error
    })
  })
  if (res && res.status === 200) {
    return new Response({
      message: "SUCCESS"
    },{
      status: 302,
      headers: {
        "Location": "/events/submit/success"
      }
    })
  }
  return new Response("ERROR");
};
