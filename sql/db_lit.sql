-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2017-04-04 11:01:48
-- 服务器版本： 10.1.19-MariaDB
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_lit`
--

-- --------------------------------------------------------

--
-- 表的结构 `activity`
--
-- 创建时间： 2017-04-04 07:26:29
--

CREATE TABLE `activity` (
  `activity_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(40) NOT NULL,
  `abstract` varchar(300) NOT NULL,
  `acti_type_id` int(11) NOT NULL,
  `cover` varchar(50) NOT NULL,
  `organizer` varchar(50) NOT NULL,
  `place` varchar(50) NOT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `start_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 表的关联 `activity`:
--   `acti_type_id`
--       `acti_type` -> `type_id`
--

--
-- 转存表中的数据 `activity`
--

INSERT INTO `activity` (`activity_id`, `user_id`, `title`, `abstract`, `acti_type_id`, `cover`, `organizer`, `place`, `create_time`, `start_time`, `end_time`) VALUES
(1, 1, '红海龟', '《红海龟》是由荷兰人迈克尔·度德威特导演，法国人帕斯卡尔·费兰联合编剧，日本人高畑勋担纲艺术指导的作品。<br>动画由法国arte&nbsp;France&nbsp;Cinéma公司、日本吉卜力工作室等联合制作，东宝国际等发行。<br>该片主要讲述了男主因航船失事流落到了无人岛，存活下的男人企图建造救生筏逃离荒岛，但他的计划却不断被一只神秘的巨型红海龟破坏，在他绝望时，一名神秘女子出现了并挽救其灵魂的故事', 8, 'cover_17040416011212.JPG', '日本吉卜力工作室', '孤岛', '2017-04-04 16:01:12', '2017-04-04 16:01:30', '2017-04-05 16:01:30');

-- --------------------------------------------------------

--
-- 表的结构 `acti_focus`
--
-- 创建时间： 2017-03-20 03:18:01
--

CREATE TABLE `acti_focus` (
  `activity_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `add_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 表的关联 `acti_focus`:
--   `activity_id`
--       `activity` -> `activity_id`
--   `user_id`
--       `user` -> `user_id`
--

-- --------------------------------------------------------

--
-- 表的结构 `acti_log`
--
-- 创建时间： 2017-04-04 04:08:54
--

CREATE TABLE `acti_log` (
  `log_id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `detail` varchar(50) NOT NULL,
  `add_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 表的关联 `acti_log`:
--

--
-- 转存表中的数据 `acti_log`
--

INSERT INTO `acti_log` (`log_id`, `activity_id`, `user_id`, `admin_id`, `detail`, `add_time`) VALUES
(1, 1, 1, 0, '创建活动直播成功', '2017-04-04 16:01:12');

-- --------------------------------------------------------

--
-- 表的结构 `acti_type`
--
-- 创建时间： 2017-03-16 06:56:41
--

CREATE TABLE `acti_type` (
  `type_id` int(11) NOT NULL,
  `type` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 表的关联 `acti_type`:
--

--
-- 转存表中的数据 `acti_type`
--

INSERT INTO `acti_type` (`type_id`, `type`) VALUES
(1, '旅游'),
(2, '生活'),
(3, '艺术'),
(4, '实践'),
(5, '体育'),
(6, '科研'),
(7, '摄影'),
(8, '影视'),
(9, '人物'),
(10, '游戏');

-- --------------------------------------------------------

--
-- 表的结构 `acti_view`
--
-- 创建时间： 2017-03-20 12:09:03
--

CREATE TABLE `acti_view` (
  `activity_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `view_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 表的关联 `acti_view`:
--

--
-- 转存表中的数据 `acti_view`
--

INSERT INTO `acti_view` (`activity_id`, `user_id`, `view_time`) VALUES
(10, 20, '2017-04-04 15:35:12'),
(1, 1, '2017-04-04 16:01:14'),
(1, 1, '2017-04-04 16:01:31'),
(1, 1, '2017-04-04 16:02:30'),
(1, 1, '2017-04-04 16:03:22');

-- --------------------------------------------------------

--
-- 表的结构 `admin`
--
-- 创建时间： 2017-03-16 13:06:01
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `admin` int(11) NOT NULL,
  `password` varchar(30) NOT NULL,
  `admin_type` int(11) NOT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 表的关联 `admin`:
--

-- --------------------------------------------------------

--
-- 表的结构 `admin_log`
--
-- 创建时间： 2017-04-04 04:09:25
--

CREATE TABLE `admin_log` (
  `admin_id` int(11) NOT NULL,
  `detail` int(11) NOT NULL,
  `add_time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 表的关联 `admin_log`:
--

-- --------------------------------------------------------

--
-- 表的结构 `comment`
--
-- 创建时间： 2017-04-04 04:24:45
--

CREATE TABLE `comment` (
  `comment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content_id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `to_comment_id` int(11) NOT NULL,
  `say` varchar(500) NOT NULL,
  `add_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 表的关联 `comment`:
--

-- --------------------------------------------------------

--
-- 表的结构 `com_agree`
--
-- 创建时间： 2017-04-04 04:26:43
--

CREATE TABLE `com_agree` (
  `user_id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL,
  `add_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 表的关联 `com_agree`:
--

-- --------------------------------------------------------

--
-- 表的结构 `com_log`
--
-- 创建时间： 2017-04-04 04:09:10
--

CREATE TABLE `com_log` (
  `log_id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `detail` varchar(50) NOT NULL,
  `add_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 表的关联 `com_log`:
--

-- --------------------------------------------------------

--
-- 表的结构 `content`
--
-- 创建时间： 2017-03-19 14:40:25
--

CREATE TABLE `content` (
  `content_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `description` varchar(500) NOT NULL,
  `add_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 表的关联 `content`:
--   `activity_id`
--       `activity` -> `activity_id`
--

--
-- 转存表中的数据 `content`
--

INSERT INTO `content` (`content_id`, `user_id`, `activity_id`, `description`, `add_time`) VALUES
(1, 1, 1, '一次船舶失事后，存活下的男人企图建造救生筏逃离荒岛，但他的计划却不断被一只神秘的巨型红海龟破坏。随后一名红发女子游到海岛上，与其生活，并有了一个孩子。一场突如其来的海啸，让三人的天堂生活顿时堕入生命垂危的地狱。最后，男子在睡梦中安详死去，而她的妻子则重新幻化为海龟，朝大海深处游去', '2017-04-04 16:03:21');

-- --------------------------------------------------------

--
-- 表的结构 `cont_img`
--
-- 创建时间： 2017-03-16 12:21:22
--

CREATE TABLE `cont_img` (
  `img_id` int(11) NOT NULL,
  `content_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `img_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 表的关联 `cont_img`:
--   `content_id`
--       `content` -> `content_id`
--

--
-- 转存表中的数据 `cont_img`
--

INSERT INTO `cont_img` (`img_id`, `content_id`, `user_id`, `img_name`) VALUES
(1, 1, 1, 'content_17040416032123.JPG');

-- --------------------------------------------------------

--
-- 表的结构 `cont_like`
--
-- 创建时间： 2017-03-20 03:29:29
--

CREATE TABLE `cont_like` (
  `user_id` int(11) NOT NULL,
  `content_id` int(11) NOT NULL,
  `add_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 表的关联 `cont_like`:
--   `content_id`
--       `content` -> `content_id`
--   `user_id`
--       `user` -> `user_id`
--

-- --------------------------------------------------------

--
-- 表的结构 `cont_log`
--
-- 创建时间： 2017-04-04 04:09:47
--

CREATE TABLE `cont_log` (
  `log_id` int(11) NOT NULL,
  `content_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `detail` varchar(50) NOT NULL,
  `add_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 表的关联 `cont_log`:
--

--
-- 转存表中的数据 `cont_log`
--

INSERT INTO `cont_log` (`log_id`, `content_id`, `user_id`, `admin_id`, `detail`, `add_time`) VALUES
(1, 1, 1, 0, '向(1)添加图文成功', '2017-04-04 16:03:21'),
(2, 1, 1, 0, '添加图片(1)成功', '2017-04-04 16:03:21');

-- --------------------------------------------------------

--
-- 表的结构 `message`
--
-- 创建时间： 2017-03-28 02:37:32
--

CREATE TABLE `message` (
  `message_id` int(11) NOT NULL,
  `from_type` tinyint(1) NOT NULL COMMENT '判断id在哪个数据表中找。0-(统一显示为)管理员；1-通过用户id查找用户名',
  `from_id` int(11) NOT NULL,
  `to_user_id` int(11) NOT NULL,
  `detail` varchar(500) NOT NULL,
  `send_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 表的关联 `message`:
--   `to_user_id`
--       `user` -> `user_id`
--

-- --------------------------------------------------------

--
-- 表的结构 `report`
--
-- 创建时间： 2017-03-20 10:44:39
--

CREATE TABLE `report` (
  `report_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reason` varchar(100) NOT NULL,
  `on_type` varchar(11) NOT NULL COMMENT '先判断举报内容,值可以有activity,content,comment',
  `on_id` int(11) NOT NULL COMMENT '对应id',
  `report_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_handled` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否被管理员处理；0-未被处理；1-已处理，php更新状态',
  `admin_id` int(11) NOT NULL COMMENT '处理的管理员',
  `handle_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 表的关联 `report`:
--

-- --------------------------------------------------------

--
-- 表的结构 `school`
--
-- 创建时间： 2017-03-19 14:17:31
--

CREATE TABLE `school` (
  `school_id` int(11) NOT NULL,
  `school_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 表的关联 `school`:
--

--
-- 转存表中的数据 `school`
--

INSERT INTO `school` (`school_id`, `school_name`) VALUES
(16, 'a'),
(17, '中国传媒大学'),
(18, '中国传媒大学 北广学院'),
(19, '中国传媒大学');

-- --------------------------------------------------------

--
-- 表的结构 `security_question`
--
-- 创建时间： 2017-03-16 04:37:20
--

CREATE TABLE `security_question` (
  `security_question_id` int(11) NOT NULL,
  `question` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 表的关联 `security_question`:
--

--
-- 转存表中的数据 `security_question`
--

INSERT INTO `security_question` (`security_question_id`, `question`) VALUES
(1, '项目名');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--
-- 创建时间： 2017-03-16 14:36:51
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `logname` varchar(20) NOT NULL,
  `uname` varchar(20) NOT NULL,
  `password` varchar(30) NOT NULL,
  `type` smallint(6) NOT NULL DEFAULT '0' COMMENT '0-用户，1-发布者',
  `headimg` varchar(50) NOT NULL,
  `school_id` int(11) NOT NULL,
  `is_deleted` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0-未删除，1-已删除，用户名还是不能重复注册',
  `is_locked` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0-未锁定，1-已锁定，并在log_lock数据表中记录',
  `introduction` varchar(500) NOT NULL,
  `security_question_id` int(11) NOT NULL,
  `security_answer` varchar(50) NOT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastlogin_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `warned_times` int(11) NOT NULL DEFAULT '0',
  `warned_total` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 表的关联 `user`:
--   `school_id`
--       `school` -> `school_id`
--   `security_question_id`
--       `security_question` -> `security_question_id`
--

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`user_id`, `logname`, `uname`, `password`, `type`, `headimg`, `school_id`, `is_deleted`, `is_locked`, `introduction`, `security_question_id`, `security_answer`, `create_time`, `lastlogin_time`, `warned_times`, `warned_total`) VALUES
(1, 'a', 'a', 'a', 2, 'default1.jpg', 19, 0, 0, '', 1, '图文直播', '2017-04-04 15:37:45', '2017-04-04 15:58:30', 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `user_lock`
--
-- 创建时间： 2017-03-16 12:20:08
--

CREATE TABLE `user_lock` (
  `user_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `reason` varchar(100) NOT NULL,
  `lock_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `unlock_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 表的关联 `user_lock`:
--   `user_id`
--       `user` -> `user_id`
--

-- --------------------------------------------------------

--
-- 表的结构 `user_log`
--
-- 创建时间： 2017-04-04 04:10:00
--

CREATE TABLE `user_log` (
  `log_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `detail` varchar(50) NOT NULL,
  `add_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 表的关联 `user_log`:
--

--
-- 转存表中的数据 `user_log`
--

INSERT INTO `user_log` (`log_id`, `user_id`, `admin_id`, `detail`, `add_time`) VALUES
(1, 20, 0, '退出登录', '2017-04-04 15:36:27'),
(2, 1, 0, '用户注册', '2017-04-04 15:37:45'),
(3, 1, 0, '用户登录', '2017-04-04 15:40:56'),
(4, 1, 0, '退出登录', '2017-04-04 15:57:17'),
(5, 1, 0, '退出登录', '2017-04-04 15:57:33'),
(6, 1, 0, '用户登录', '2017-04-04 15:57:39'),
(7, 1, 0, '用户登录', '2017-04-04 15:58:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`activity_id`),
  ADD KEY `from_user_id` (`user_id`),
  ADD KEY `acti_type_id` (`acti_type_id`) USING BTREE;

--
-- Indexes for table `acti_focus`
--
ALTER TABLE `acti_focus`
  ADD KEY `activity_id` (`activity_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `acti_log`
--
ALTER TABLE `acti_log`
  ADD PRIMARY KEY (`log_id`),
  ADD KEY `activity_id` (`activity_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `acti_type`
--
ALTER TABLE `acti_type`
  ADD PRIMARY KEY (`type_id`);

--
-- Indexes for table `acti_view`
--
ALTER TABLE `acti_view`
  ADD KEY `activity_id` (`activity_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `admin_log`
--
ALTER TABLE `admin_log`
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `content_id` (`content_id`),
  ADD KEY `activity_id` (`activity_id`),
  ADD KEY `to_comment_id` (`to_comment_id`);

--
-- Indexes for table `com_agree`
--
ALTER TABLE `com_agree`
  ADD KEY `user_agreewith_com` (`user_id`,`comment_id`),
  ADD KEY `fk_comagree_comment` (`comment_id`);

--
-- Indexes for table `com_log`
--
ALTER TABLE `com_log`
  ADD PRIMARY KEY (`log_id`),
  ADD KEY `admin_id` (`admin_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `comment_id` (`comment_id`);

--
-- Indexes for table `content`
--
ALTER TABLE `content`
  ADD PRIMARY KEY (`content_id`),
  ADD KEY `from_user_id` (`user_id`),
  ADD KEY `to_activity_id` (`activity_id`);

--
-- Indexes for table `cont_img`
--
ALTER TABLE `cont_img`
  ADD PRIMARY KEY (`img_id`),
  ADD KEY `content_id` (`content_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `cont_like`
--
ALTER TABLE `cont_like`
  ADD KEY `content_id` (`content_id`),
  ADD KEY `user_id` (`user_id`) USING BTREE;

--
-- Indexes for table `cont_log`
--
ALTER TABLE `cont_log`
  ADD PRIMARY KEY (`log_id`),
  ADD KEY `content_id` (`content_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `to_user_id` (`to_user_id`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`report_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `school`
--
ALTER TABLE `school`
  ADD PRIMARY KEY (`school_id`);

--
-- Indexes for table `security_question`
--
ALTER TABLE `security_question`
  ADD PRIMARY KEY (`security_question_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `security_question_id` (`security_question_id`),
  ADD KEY `school_id` (`school_id`);

--
-- Indexes for table `user_lock`
--
ALTER TABLE `user_lock`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `user_log`
--
ALTER TABLE `user_log`
  ADD PRIMARY KEY (`log_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `activity`
--
ALTER TABLE `activity`
  MODIFY `activity_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 使用表AUTO_INCREMENT `acti_log`
--
ALTER TABLE `acti_log`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 使用表AUTO_INCREMENT `acti_type`
--
ALTER TABLE `acti_type`
  MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- 使用表AUTO_INCREMENT `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `comment`
--
ALTER TABLE `comment`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `com_log`
--
ALTER TABLE `com_log`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `content`
--
ALTER TABLE `content`
  MODIFY `content_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 使用表AUTO_INCREMENT `cont_img`
--
ALTER TABLE `cont_img`
  MODIFY `img_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 使用表AUTO_INCREMENT `cont_log`
--
ALTER TABLE `cont_log`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- 使用表AUTO_INCREMENT `message`
--
ALTER TABLE `message`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `report`
--
ALTER TABLE `report`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `school`
--
ALTER TABLE `school`
  MODIFY `school_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- 使用表AUTO_INCREMENT `security_question`
--
ALTER TABLE `security_question`
  MODIFY `security_question_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 使用表AUTO_INCREMENT `user_log`
--
ALTER TABLE `user_log`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- 限制导出的表
--

--
-- 限制表 `activity`
--
ALTER TABLE `activity`
  ADD CONSTRAINT `fk_activity_type` FOREIGN KEY (`acti_type_id`) REFERENCES `acti_type` (`type_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- 限制表 `acti_focus`
--
ALTER TABLE `acti_focus`
  ADD CONSTRAINT `fk_actifocus_activity` FOREIGN KEY (`activity_id`) REFERENCES `activity` (`activity_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_actifocus_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `content`
--
ALTER TABLE `content`
  ADD CONSTRAINT `fk_cont_activity` FOREIGN KEY (`activity_id`) REFERENCES `activity` (`activity_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `cont_img`
--
ALTER TABLE `cont_img`
  ADD CONSTRAINT `fk_contimg_content` FOREIGN KEY (`content_id`) REFERENCES `content` (`content_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `cont_like`
--
ALTER TABLE `cont_like`
  ADD CONSTRAINT `fk_contlike_content` FOREIGN KEY (`content_id`) REFERENCES `content` (`content_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_contlike_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `fk_message_user` FOREIGN KEY (`to_user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `fk_user_school` FOREIGN KEY (`school_id`) REFERENCES `school` (`school_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_sq` FOREIGN KEY (`security_question_id`) REFERENCES `security_question` (`security_question_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- 限制表 `user_lock`
--
ALTER TABLE `user_lock`
  ADD CONSTRAINT `fk_userlock_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
