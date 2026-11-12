
const {
  Client,
  GatewayIntentBits,
  EmbedBuilder
} = require('discord.js');

// ==============================
// DISCORD WELCOME BOT PRO
// ==============================

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

// CONFIG
const TOKEN = process.env.DISCORD_TOKEN;

const WELCOME_CHANNEL_ID =
  process.env.WELCOME_CHANNEL_ID;

const GOODBYE_CHANNEL_ID =
  process.env.GOODBYE_CHANNEL_ID;

const AUTO_ROLE_ID =
  process.env.AUTO_ROLE_ID;

const WELCOME_IMAGE =
  process.env.WELCOME_IMAGE;

// CHECK CONFIG
if (!TOKEN) {
  console.error('❌ DISCORD_TOKEN is missing!');
  process.exit(1);
}

// BOT ONLINE
client.once('ready', () => {
  console.log('================================');
  console.log(`✅ Bot: ${client.user.tag}`);
  console.log(`🟢 Status: ONLINE`);
  console.log(`🤖 Servers: ${client.guilds.cache.size}`);
  console.log('================================');
});

// ==============================
// MEMBER JOIN
// ==============================

client.on('guildMemberAdd', async (member) => {

  console.log(`JOIN: ${member.user.tag}`);

  // AUTO ROLE
  if (AUTO_ROLE_ID) {
    try {
      await member.roles.add(AUTO_ROLE_ID);
      console.log('✅ Auto Role Added');
    } catch (error) {
      console.error('❌ Auto Role Error:', error.message);
    }
  }

  // WELCOME CHANNEL
  const channel = member.guild.channels.cache.get(
    WELCOME_CHANNEL_ID
  );

  if (!channel || !channel.isTextBased()) return;

  // WELCOME EMBED
  const embed = new EmbedBuilder()
    .setColor('#9B59B6')
    .setTitle('🎉 WELCOME TO OUR SERVER!')
    .setDescription(
      `សូមស្វាគមន៍ ${member} 💜\n` +
      `Welcome to **${member.guild.name}**!\n\n` +
      `👤 Member: ${member.user.tag}\n` +
      `👥 Total Members: ${member.guild.memberCount}\n\n` +
      `✨ សូមរីករាយជាមួយ Server របស់យើង!\n` +
      `✨ Enjoy your stay!`
    )
    .setThumbnail(
      member.user.displayAvatarURL({ size: 256 })
    )
    .setFooter({
      text: 'Welcome • Thank you for joining us!'
    })
    .setTimestamp();

  if (WELCOME_IMAGE) {
    embed.setImage(WELCOME_IMAGE);
  }

  try {
    await channel.send({
      content: `🎊 Welcome ${member}!`,
      embeds: [embed]
    });

    console.log('✅ Welcome Message Sent');

  } catch (error) {
    console.error('❌ Welcome Error:', error.message);
  }
});

// ==============================
// MEMBER LEAVE
// ==============================

client.on('guildMemberRemove', async (member) => {

  console.log(`LEAVE: ${member.user.tag}`);

  const channel = member.guild.channels.cache.get(
    GOODBYE_CHANNEL_ID
  );

  if (!channel || !channel.isTextBased()) return;

  const embed = new EmbedBuilder()
    .setColor('#E74C3C')
    .setTitle('👋 GOODBYE!')
    .setDescription(
      `Goodbye **${member.user.tag}** 💔\n\n` +
      `${member.user.username} បានចាកចេញពី Server ហើយ។\n\n` +
      `👥 Members Left: ${member.guild.memberCount}\n\n` +
      `We hope to see you again! ❤️`
    )
    .setThumbnail(
      member.user.displayAvatarURL({ size: 256 })
    )
    .setFooter({
      text: 'Thank you for being with us!'
    })
    .setTimestamp();

  try {
    await channel.send({
      embeds: [embed]
    });

    console.log('✅ Goodbye Message Sent');

  } catch (error) {
    console.error('❌ Goodbye Error:', error.message);
  }
});

// ==============================
// ERROR HANDLING
// ==============================

client.on('error', (error) => {
  console.error('Discord Client Error:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
});

// LOGIN
client.login(TOKEN);
