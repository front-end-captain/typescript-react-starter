const Router = require("express").Router();

let PAPER_LIST = require("../db/paperList.js");

/**
 * 获取试卷列表
 * @param {number} page?
 * @param {number} size?
 * @param {string} name? paper name
 */
Router.post("/list", (request, response) => {
  let {
    body: { page = 1, size = 10, name = "" },
  } = request;

  page = Number(page);
  size = Number(size);
  name = name.trim();

  let paperList = [];

  if (name) {
    paperList = PAPER_LIST.filter((paper) => {
      return paper.name === name;
    }).map((paper) => {
      return {
        id: paper.id,
        name: paper.name,
        examTime: paper.examTime,
        createTime: paper.createTime,
        creator: paper.creator,
      };
    });

    return response.json({
      code: 200000,
      message: "success",
      data: {
        pagination: { page: Number(page), pageSize: Number(size), total: paperList.length },
        list: paperList,
      },
    });
  }

  paperList = PAPER_LIST.slice(size * (page - 1), size * page).map((paper) => {
    return {
      id: paper.id,
      name: paper.name,
      examTime: paper.examTime,
      createTime: paper.createTime,
      creator: paper.creator,
    };
  });

  return response.json({
    code: 200000,
    message: "success",
    data: {
      pagination: { page: Number(page), pageSize: Number(size), total: PAPER_LIST.length },
      list: paperList,
    },
  });
});

/**
 * 删除试卷
 *
 * @param {number} 试卷ID
 */
Router.post("/del", (request, response) => {
  const paperId = request.body.paperId;

  const targetPaper = PAPER_LIST.find((paper) => paper.id === Number(paperId));

  if (!targetPaper) {
    return response.status(200).json({ code: -1, message: "paper not exist", data: null });
  }

  let targetPaperBoundByCourse;

  let contentList = [];
  COURSE_LIST.forEach((course) => {
    course.catalogs.forEach((catalog) => {
      catalog.contents.forEach((content) => {
        if (content.type === 2) {
          contentList.push(content);
        }
      });
    });
  });

  targetPaperBoundByCourse = contentList.some((content) => {
    return content.relatedContentId === Number(paperId);
  });

  // 试卷被某一个课程关联，不允许删除
  if (targetPaperBoundByCourse) {
    return response.status(200).json({
      code: -2,
      message: "the paper you will deleted was be bound someone course",
      data: null,
    });
  }

  const newPapers = PAPER_LIST.filter((paper) => {
    return paper.id !== Number(paperId);
  });

  PAPER_LIST = newPapers;

  response.status(200);
  response.json({ code: 200000, message: "success", data: paperId });
});

module.exports = Router;
