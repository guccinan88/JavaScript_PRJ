module.exports = {
  notes: async (parent, args, { models }) => {
    return await models.Note.find();
  },
  note: (parent, args, { models }) => {
    return notes.find((note) => note.id === args.id);
  },
};
