const { exec } = require('../db/mysql');

const getList = async (author, keyword) => {
  let sql = `select * from blogs where 1=1 `;
  if (author) {
    sql += `and author='${author}' `;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }
  sql += `order by createtime desc;`;

  // 返回 promise
  return await exec(sql);
};

const getDeatail = async (id) => {
  const sql = `select * from blogs where id='${id}'`;
  const rows = await exec(sql);
  return rows[0];
};

const newBlog = async (blogData = {}) => {
  // blogData 是一个博客对象，包含title content author 属性
  const title = blogData.title;
  const content = blogData.content;
  const author = blogData.author;
  const createTime = Date.now();

  const sql = `
        insert into blogs (title, content, createtime, author)
        values ('${title}', '${content}', ${createTime}, '${author}');
    `;
  const insertData = await exec(sql);
  return {
    id: insertData.insertId,
  };
};

const updateBlog = async (id, blogData = {}) => {
  // id 就是要更新博客的id
  // blogData 是一个博客对象，包含title content 属性

  const title = blogData.title;
  const content = blogData.content;

  const sql = `
        update blogs set title='${title}', content='${content}' where id=${id}
    `;
  const updateData = await exec(sql);
  // console.log('updateData is ', updateData)
  if (updateData.affectedRows > 0) {
    return true;
  }
  return false;
};

const delBlog = async (id, author) => {
  // id 就是要删除博客的id
  const sql = `delete from blogs where id='${id}' and author='${author}';`;
  const delData = await exec(sql);
  // console.log('delData is ', delData)
  if (delData.affectedRows > 0) {
    return true;
  }
  return false;
};

module.exports = {
  getList,
  getDeatail,
  newBlog,
  updateBlog,
  delBlog,
};
