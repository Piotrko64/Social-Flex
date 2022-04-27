export const mainQuery = `query MyQuery {
  allNexts {
    title
    id
    content {
      value
    }
    describe {
      value
    }
    image {
      url
    }
  }
}`;

export const onePostQuery = (id) => {
    return `query MyQuery {
  allNexts(filter:{
id:{
eq: ${id}}
}) {
    title
    id
    content {
      value
    }
    describe {
      value
    }
    image {
      url
    }
  }
}`;
};
