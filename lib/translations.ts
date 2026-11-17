import subjects from '../data/discipline-labels-en.json';
const lines=`行为记录尚未上传，请稍后重试|Behavior records have not uploaded yet. Please try again shortly.
平台记录本页作答时间、鼠标移动与点击、滚动、页面切换、复制/粘贴事件，以及持续选中的原文、位置和停留时间，用于研究质量复核。不会记录键盘输入轨迹或其他网页内容。异常行为仅作为复核线索。标注过程中请独立判断，不使用外部资料或 AI 工具。|For research quality review, this page records response time, mouse movement and clicks, scrolling, visibility changes, copy/paste events, and sustained text selections including their original text, location and duration. It does not record keystrokes or other pages. Unusual behavior is only a review signal. Please judge independently without outside sources or AI tools.
选中文本停留记录无效|The selected-text dwell record is invalid.
文本选中停留记录|Selected-text dwell records
仅作为判断依据的复核线索，不直接推断重要性。|A review signal about the basis of judgment; it does not establish importance.
当前已加载轨迹中暂无达到门槛的文本选中记录。|No qualifying text selections in the currently loaded events.
秒|seconds
查看同期轨迹|View corresponding mouse trace
显示全部轨迹|Show all mouse traces
未作答|Unanswered
结构化信息沿用项目现有 persona。|The structured information follows the project's existing persona.
学者资料 · 全面信息|Scholar materials · Full information
学者资料 · 基础信息|Scholar materials · Basic information
阅读所选学者资料|Read about the selected scholars
请逐位阅读至末尾，确认后进入标注。|Read each scholar's materials to the end and confirm before starting annotation.
学者资料正文|Scholar reading materials
正在加载学者资料…|Loading scholar materials…
生平简介 · Profile|Biographical profile
结构化信息 · Persona|Structured persona
研究领域|Research fields
学术观点|Academic views
研究方法|Research methods
论证习惯|Argumentation
本轮涉及著作|Works included in this round
来源与书目|Source and catalogue
典型文段示例|Representative excerpts
资料来源|Sources
结构化信息沿用项目现有 persona；著作简介为内容提要。示例保留原文语言。|The structured information follows the project's existing persona. Work introductions summarize their contents. Excerpts retain their original language.
生平资料来源|Biographical source
本位学者资料已到末尾|End of this scholar's materials
我已阅读并了解这位学者的资料|I have read and understood these scholar materials
已完成阅读|Reading completed
请继续阅读至末尾|Continue reading to the end
请继续阅读，剩余秒数：|Continue reading. Seconds remaining:
可以确认并继续|You can confirm and continue
完成阅读，开始标注|Finish reading and start annotation
确认并阅读下一位|Confirm and read the next scholar
继续阅读学者资料|Continue to scholar materials
学者资料阅读|Scholar materials
请先完成全部学者资料阅读|Complete all scholar reading materials first.
当前不在资料阅读阶段|This round is not in the reading stage.
资料版本已更新，请重新开始|The materials have changed. Please start a new round.
阅读记录已变化，请重试|The reading record changed. Please try again.
请按顺序阅读所选学者资料|Read the selected scholars in order.
请阅读至末尾并确认已阅读|Read to the end and confirm that you have read the materials.
学者资料不存在|Scholar materials are unavailable.
个性化图灵测试|Personalized Turing Test
标注平台|Annotation Platform
个性化图灵测试标注平台|Personalized Turing Test Annotation
个性化图灵测试 · 研究后台|Personalized Turing Test · Research Dashboard
标注设置|Annotation setup
AI是否能模仿特定的人？|Can AI imitate a specific person?
选择你认为是真实学者写的文段。|Choose the passage you think was written by the real scholar.
配置本轮标注|Configure this round
标注邀请码|Annotation invitation code
领域|Domain
学者（可多选）|Scholars (select one or more)
角色|Role
资料展示|Information exposure
请选择资料展示方式|Select information exposure
不提供额外信息|No additional information
基础资料|Basic profile
全面资料|Comprehensive profile
请选择角色|Select a role
普通人|General participant
有专业背景-提供基础信息|Professional background - basic information
有专业背景-提供全面信息|Professional background - full information
对所选学者及其写作的熟悉程度|Familiarity with selected scholars
职业阶段|Career stage
研究或工作方向|Research or professional focus
本轮标注总数|Total questions this round
自定义|Custom
自定义标注数量|Custom question count
所选学者可用题数：|Available questions for selected scholars:
篇章、段落补全、句子补全均衡抽取。|Balanced across passages, paragraph completion and sentence completion.
上文|Preceding context
下文|Following context
待判断句子|Compare the candidate sentences
待判断段落|Compare the candidate paragraphs
本轮标注已完成|Round completed
请完成标注设置并同意数据记录说明|Complete the setup and agree to the data collection notice.
请选择专业方向|Select your discipline.
请填写职业阶段和研究方向|Complete your career stage and research focus.
请选择当前领域内的学者|Select scholars within the current field.
题目由系统均衡随机抽取|Questions are assigned randomly with balanced coverage.
题量超出所选学者题库范围|The question count exceeds the selected scholars' available questions.

很不确定|Very uncertain
不太确定|Somewhat uncertain
一般|Neutral
比较确定|Fairly confident
很确定|Very confident
哲学|Philosophy
经济学|Economics
法学|Law
教育学|Education
文学|Literature
历史学|History
理学|Sciences
工学|Engineering
农学|Agriculture
医学|Medicine
军事学|Military Studies
管理学|Management
艺术学|Arts
交叉学科|Interdisciplinary Studies
计算机|Computer Science
计算机科学|Computer Science
法律|Law
金融|Finance
江平|Jiang Ping
高铭暄|Gao Mingxuan
亚当·斯密|Adam Smith
凯恩斯|John Maynard Keynes
凡勃伦|Thorstein Veblen
小同行|Same subfield
大同行|Same discipline, different subfield
跨学科|Different discipline
待细分|Subfield unspecified
保存失败|Unable to save
已保存|Saved
知辨|Zhibian
学术文本标注平台|Academic Text Annotation
身份确认|Your background
让专业背景有据可依|Tell us your research background
设置题量|Set your question count
均衡随机分配题目|Balanced random assignment
文本判断|Text judgment
阅读、比较、表达信心|Read, compare and rate confidence
证据标注|Evidence annotation
为专业判断留下依据|Explain what informed your choice
每一次判断，|Every judgment
都是新的研究证据。|adds to the evidence.
与研究者同行，共同理解|Join fellow researchers in exploring
人类写作与学术智能的边界。|the boundaries of human and AI writing.
贡献者工作台|Contributor workspace
新一轮标注|Start a new round
盲测标注|Blind annotation
知|Z
关闭|Close
正在连接标注平台…|Connecting to the annotation platform…
让你的专业判断，|Let your expertise
成为理解智能的|offer
新证据。|new evidence about AI.
一段来自真实学者，一段由模型生成。|One passage is by the scholar. The other is model-generated.
邀请你用专业阅读，辨认字里行间的学术声音。|Use your expertise to recognize the scholarly voice behind the words.
· 即将开放|· Coming soon
组文本|text pairs
先认识一下你的研究视角|Tell us about your perspective
选择你的身份、专业方向，以及希望阅读的学者。|Select your role, discipline and the scholar you would like to read.
约 1 分钟|About 1 minute
请阅读并同意研究数据记录说明|Please read and accept the research data collection notice.
该领域尚无作者题库，请选择法律或金融|No scholars are available in this field yet. Please select Law or Finance.
你的身份|Your role
请选择身份|Select your role
在读学生|Student
科研人员 / 博士后|Researcher / Postdoctoral fellow
高校教师|University faculty
行业从业者|Industry professional
其他研究参与者|Other research participant
以专业方向记录研究视角。|Your discipline helps us understand your perspective.
贡献者编号将在开始标注时自动生成。|A contributor ID is generated when you start.
专业方向 · 一级学科|Discipline · Primary field
请选择一级学科|Select a primary field
· 2022目录|· 2022 catalogue
1997目录保留方向|Legacy fields retained from 1997
专业方向 · 二级学科|Discipline · Secondary field
请选择二级学科|Select a secondary field
本一级方向（无统一二级选项 / 未分设）|Primary field only (no nationally listed subfields)
学科目录说明|About the discipline catalogue
按教育部2022年目录选择：一级为两位代码的学科门类（如01哲学），二级为四位代码的学科方向（如0101哲学）。|Choose from the 2022 Ministry of Education catalogue: the first level uses two-digit categories (e.g. 01 Philosophy), and the second uses four-digit disciplines (e.g. 0101 Philosophy).
一级学科采用教育部 2022 年研究生目录；二级学科采用国家 1997 年目录，共 386 个方向。旧版中被拆分或重设的一级学科单列保留，避免误合并；新增一级学科暂无全国统一二级选项时按一级方向记录。|Primary fields follow the Ministry of Education's 2022 postgraduate catalogue; secondary fields follow the 1997 national catalogue, with 386 subfields. Legacy primary fields that were split or reorganized are listed separately. New primary fields without nationally standardized subfields are recorded at primary-field level.
2022目录|2022 catalogue
1997目录|1997 catalogue
希望标注的题目领域|Question field
（题库准备中）|(Question bank in preparation)
希望标注的作者 · 单选|Scholar · Select one
请选择一位作者|Select a scholar
暂无作者|No scholars available yet
题库正在准备中，作者列表暂为空。你可以先选择法律或金融参与标注。|questions are in preparation, so no scholars are listed yet. You can participate in Law or Finance for now.
你对|Your familiarity with
这位作者|this scholar
及其写作的熟悉程度|and their writing
请选择熟悉程度|Select your familiarity
不了解|Not familiar
略有了解|Slightly familiar
一般熟悉|Moderately familiar
比较熟悉|Quite familiar
非常熟悉|Very familiar
让研究过程透明，也让你的判断保持独立|Transparent research. Independent judgment.
平台记录本页作答时间、鼠标移动与点击、滚动、页面切换，以及复制/粘贴事件，用于研究质量复核。不会记录键盘输入轨迹或其他网页内容。异常行为仅作为复核线索。标注过程中请独立判断，不使用外部资料或 AI 工具。|For research quality review, this page records response time, mouse movement and clicks, scrolling, page visibility changes, and copy/paste events. It does not record keystrokes or the contents of other pages. Unusual behavior is only a review signal. Please make your judgments independently, without outside sources or AI tools.
我已阅读，并同意上述研究数据记录方式。|I have read and agree to the research data collection described above.
同行关系由专业方向与作者方向自动匹配。|Peer groups are determined automatically from your discipline and the scholar's field.
设置本轮题量|Set this round's question count
专业没有标准姿势，认真阅读就是最好的开始。|Thoughtful reading is the best place to begin.
这一次，想读多少道题？|How many questions would you like to read?
选择适合你的题量，系统会为你随机安排文段。|Choose a comfortable workload. The platform will randomly assign text pairs.
修改身份与作者|Edit background and scholar
请完整填写作者与熟悉程度|Please select a scholar and your familiarity with their writing.
· 当前题库|· Available questions:
题|questions
一轮一位作者|One scholar per round
希望为这位作者完成的题目数量|Number of questions for this scholar
方法均衡，题目随机|Balanced methods, random questions
系统在当前作者的可用生成方法之间均衡分配题量，并随机抽取互不重复的文本对。|Questions are balanced across the available generation methods for this scholar. Text pairs are sampled randomly without replacement.
这位作者当前只有一种生成方法，按现有题库随机抽取。|Only one generation method is currently available for this scholar. Questions are sampled from the existing bank.
道文本判断|text judgments
道依据与证据标注|evidence annotations
按本轮题量的|Based on
% 向上取整|% of this round, rounded up
提交前可以回看和修改本轮判断。|You can review and edit your judgments before submitting the round.
开始标注|Start annotating
为你的判断，留下证据。|Make your reasoning visible.
哪一段更像学者的真实写作？|Which passage reads like the scholar's own writing?
证据已保存|Evidence entries saved
判断已保存|Judgments saved
证据题组|Evidence questions
本轮题目|This round
提交本轮判断后，|Once you submit this round,
原答案将锁定。|your judgments will be locked.
正在打开题目…|Opening question…
第|Question
写作任务|Original writing task
展开 / 收起|Expand / Collapse
在原文中拖选句子，即可添加证据。原选择|Select sentences in either passage to add evidence. Your choice:
，信心|, confidence:
文本|Passage
匿名文段|Anonymous passage
选择文本|Choose passage
你对这个选择有多确定？|How confident are you in this choice?
不确定也是有价值的判断。请如实表达你的信心。|Uncertainty is useful evidence too. Please rate your confidence honestly.
哪些要素影响了你的判断？|What informed your judgment?
可多选一级维度；每个选中的维度至少选择一个二级要素。|Select one or more primary dimensions, with at least one secondary factor under each selected dimension.
判断依据|Reasoning
结合所选要素，解释这些特征如何影响你的判断（至少 10 字）。|Explain how the selected factors informed your choice (at least 10 characters).
原文证据|Evidence from the passages
条|quotes
可从两个文本中分别引用|You may quote from either passage
在上方原文中拖选，添加你认为关键的证据。|Select text in the passages above to add supporting evidence.
删除证据|Remove quote
记录已连接 · 每题保存后可继续|Recording connected · Save each question to continue
轨迹暂存中 · 正在重试连接|Events buffered · Reconnecting
保存本题|Save this question
完成本题|Finish this question
保存并继续|Save and continue
提交全部证据，完成贡献|Submit all evidence and finish
提交本轮判断，进入证据标注|Submit judgments and add evidence
专业的声音，|Your expertise
值得被认真记录。|deserves to be heard.
感谢|Thank you,
。你完成了|. You completed
和|and
道证据标注，数据已保存至研究后台。|evidence annotations. Your data has been saved to the research database.
本轮贡献已完成|This contribution is complete
记录编号：|Record ID:
再贡献一轮|Contribute another round
为保持后续标注的独立性，平台不展示正确答案或个人得分。|Correct answers and personal scores are not shown, to keep future judgments independent.
提交这份研究贡献？|Submit this contribution?
提交本轮文本判断？|Submit this round's judgments?
请确认所有抽样题的一级、二级维度、说明和原文证据均已保存。提交后本轮任务完成。|Please check that the dimensions, reasoning and passage evidence have been saved for every sampled question. Submitting completes this round.
提交后，A/B 选择与 confidence 将锁定。接下来为按比例抽出的题目补充判断依据和原文证据。|Your A/B choices and confidence ratings will be locked after submission. You will then add reasoning and passage evidence for the sampled questions.
继续检查|Keep reviewing
确认提交|Confirm submission
返回标注平台|Back to the annotation platform
知辨 · 研究后台|Zhibian · Research dashboard
把判断变成可分析的证据|Turn judgments into research evidence
正确性、confidence、同行类型与行为记录仅在此后台可见。|Accuracy, confidence, peer groups and behavioral records are visible only in this dashboard.
输入研究后台管理密钥|Enter the research admin key
刷新数据|Refresh data
进入研究后台|Open research dashboard
全部标注轮次|All annotation rounds
当前页判断数量|Judgments on this page
当前页准确率|Accuracy on this page
当前页已完成轮次|Completed rounds on this page
页 · 每页最多|page · Up to
轮|rounds
导出本页统计|Export this page's statistics
上一页|Previous page
下一页|Next page
轮 ·|rounds ·
个判断 · 准确率|judgments · Accuracy:
信心|Confidence
参与者 / 编号|Contributor / ID
身份与领域|Background and field
进度|Progress
准确率|Accuracy
活跃时间|Active time
复核线索|Review signals
操作|Actions
多位作者（旧版）|Multiple scholars (legacy)
· 熟悉度|· Familiarity:
已完成|Complete
分钟|minutes
暂无|None
仅供人工复核|For human review only
查看记录|View record
尚无标注数据，完成一轮后会显示在这里。|No annotation data yet. Completed rounds will appear here.
标注过程与原文证据|Annotation process and passage evidence
记录|Record
· 时间为前台观测，无法单凭行为确认作弊。|· Timing is observed in the browser. Behavior alone cannot establish cheating.
导出完整记录|Export the full record
· 选择|· Choice:
· 信心|· Confidence:
鼠标视口轨迹 · 绿色为移动，棕色为点击。当前显示|Mouse paths in the viewport · Green: movement, brown: clicks. Displaying
批次，完整导出包含全部轨迹。触屏参与者可能没有鼠标轨迹。|batches. The full export includes all events. Touchscreen users may have no mouse paths.
研究主题|Research topic
研究者选择什么问题、概念、对象、材料和方法|The problems, concepts, objects, materials and methods the scholar chooses
研究问题与对象|Research questions and objects
文本使用的对象、案例、数据、实验材料是否符合其习惯|Are the objects, cases, data or experimental materials typical of this scholar?
方法与技术路线|Methods and technical approaches
是否符合其常用方法、技术路径、识别策略或证明工具|Are the methods, technical approaches, identification strategies or proof techniques typical?
核心概念体系|Core conceptual repertoire
是否使用其常见概念、分类方式和问题划分|Does the text use the scholar's usual concepts, classifications and ways of framing problems?
学术立场|Academic stance
研究者如何定位争议、采取何种理论框架和价值判断|How the scholar positions debates and selects theoretical frameworks and value judgments
理论谱系|Theoretical tradition
文本是否属于其一贯依托的理论传统|Does the text belong to the theoretical tradition the scholar usually draws on?
争议定位|Position in a debate
是否按照其习惯划分争议、批评对方或限定问题|Does it frame debates, critique opposing views or delimit questions in the scholar's usual way?
价值取向/规范判断|Values and normative judgments
是否体现其常见价值判断、规范原则或评价标准|Does it reflect the scholar's usual values, normative principles or evaluation criteria?
语言风格|Language and style
研究者如何在学术写作中表达自己、组织论证、使用术语和修辞|How the scholar expresses ideas, organizes arguments and uses terminology and rhetoric
术语与搭配|Terminology and collocations
是否使用其常见术语、固定搭配、限定性表达|Does it use the scholar's familiar terms, collocations and qualifications?
句法与段落节奏|Syntax and paragraph rhythm
句长、转折、递进、并列、概括—展开方式是否相似|Are sentence length, contrasts, progression, coordination and elaboration patterns similar?
修辞与语气|Rhetoric and tone
是否偏谨慎、强判断、批判性、解释性、规范化或技术化|Is the tone cautious, assertive, critical, explanatory, normative or technical?
文献与引用习惯|Sources and citation practices
是否引用同类文献、经典理论、判例、实验、数据或政策材料|Does it cite similar literature, classic theories, case law, experiments, data or policy materials?
数据库未连接|The database is unavailable.
请先创建标注任务|Please start an annotation round first.
无权访问此任务|You do not have access to this round.
页面已重置，请从身份页重新开始|This page has been reset. Please start again from the background form.
题目不属于此任务|This question does not belong to your round.
请求来源无效|The request origin is invalid.
请求过大|The request is too large.
请完整填写身份、专业方向、作者熟悉度，并同意研究数据记录说明|Please complete your role, discipline and familiarity, and accept the data collection notice.
该领域暂无可标注作者，请选择法律或金融|No scholars are available in this field yet. Please select Law or Finance.
题目由系统按方法均衡随机抽取，不能自行指定|Questions are assigned randomly with balanced methods; they cannot be chosen manually.
题量超出作者题库范围|The requested count exceeds this scholar's question bank.
任务已完成|This round is complete.
轨迹批次无效|The event batch is invalid.
轨迹记录超过限制|The event record limit has been reached.
判断已锁定|Your judgments have been locked.
请选择 A/B 和 1–5 分信心|Please select A or B and a confidence rating from 1 to 5.
请先打开题目|Please open the question first.
请完成所有题目再继续|Please finish every question before continuing.
题目不在证据列表|This question is not in the evidence sample.
请选择一级、二级维度，写至少 10 字说明，并添加原文证据|Select primary and secondary dimensions, write at least 10 characters of reasoning, and add passage evidence.
每个选中的一级维度，至少选择一个属于它的二级要素|Select at least one valid secondary factor under every selected primary dimension.
证据必须来自当前题目的准确原文|Evidence must match the exact text of a passage in this question.
请先完成判断|Please complete your judgments first.
未知操作|Unknown operation.
研究后台需要管理密钥|An admin key is required for the research dashboard.
记录不存在|This record does not exist.
清空参数无效|Invalid reset parameters.
存在活跃时间少于10秒的题目|At least one question has less than 10 seconds of active time.
页面切换较多|Frequent page visibility changes.
未记录鼠标移动（可能使用触屏或键盘）|No mouse movements recorded (possibly touchscreen or keyboard use).
刷新将清空本轮未提交填写，已提交的数据仍保留在后台。|Refreshing clears this unfinished round. Fully submitted research records remain in the database.
退出后本轮填写不恢复|This round will not resume after you leave or refresh.
清空本轮并重新开始|Clear this round and start again
仅一级方向|Primary field only
中文|中文
English|English
`;
export const english:Record<string,string>={...subjects,...Object.fromEntries(lines.trim().split('\n').map(line=>{const index=line.indexOf('|');return [line.slice(0,index),line.slice(index+1)];}))};
export type Language='zh'|'en';
export function translate(value:string,language:Language):string{
 if(!value)return value;
 if(language==='zh')return ({'Adam Smith':'亚当·斯密','John Maynard Keynes':'约翰·梅纳德·凯恩斯','Thorstein Veblen':'索尔斯坦·凡勃伦','John Stuart Mill':'约翰·斯图亚特·密尔','Friedrich Nietzsche':'弗里德里希·尼采','Bertrand Russell':'伯特兰·罗素',
  'Oliver Wendell Holmes Jr.':'小奥利弗·温德尔·霍姆斯','Benjamin N. Cardozo':'本杰明·卡多佐','Edsger W. Dijkstra':'艾兹格·迪杰斯特拉','Yoshua Bengio':'约书亚·本吉奥','Kaiming He':'何恺明','William Shakespeare':'威廉·莎士比亚','Jane Austen':'简·奥斯汀','Leo Tolstoy':'列夫·托尔斯泰'
 } as Record<string,string>)[value]||value;
 const author = ({'江平':'Jiang Ping','高铭暄':'Gao Mingxuan','厉以宁':'Li Yining','冯友兰':'Feng Youlan','王阳明':'Wang Yangming','鲁迅':'Lu Xun','曹雪芹':'Cao Xueqin'} as Record<string,string>)[value];
 if(author)return author;
 const key=value.trim();if(english[key])return value.replace(key,english[key]);
 if(key.includes(' / '))return key.split(' / ').map(v=>translate(v,language)).join(' / ');
 if(key.includes('：'))return key.split('：').map(v=>translate(v,language)).join(': ');
 if(key.includes('、'))return key.split('、').map(v=>translate(v,language)).join(', ');
 const quota=key.match(/^各方法题数差不超过 1；余数随机分配，本轮最多抽取 (\d+) 题。$/);if(quota)return `Method counts differ by at most 1. Remainder slots are assigned randomly. This round allows up to ${quota[1]} questions.`;
 const maximum=key.match(/^为保证不同方法均衡，本作者本轮最多 (\d+) 题$/);if(maximum)return `To keep methods balanced, this scholar allows up to ${maximum[1]} questions per round.`;
 const required=key.match(/^请完成全部 (\d+) 道证据标注$/);if(required)return `Please complete all ${required[1]} evidence annotations.`;
 const contributor=key.match(/^贡献者 (.+)$/);if(contributor)return `Contributor ${contributor[1]}`;
 return value;
}
