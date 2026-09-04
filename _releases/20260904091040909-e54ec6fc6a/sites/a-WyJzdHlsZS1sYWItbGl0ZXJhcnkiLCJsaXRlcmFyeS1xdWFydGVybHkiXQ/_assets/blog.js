(function(){window.__htmlServerLayoutArticleCard=function(context){var body=document.body,article=context.article,articleIndexNumber=context.index,card=context.card,articleCover=context.articleCover,applyThemeCover=context.applyThemeCover,themeCover=context.themeCover,siteUrl=context.siteUrl,folderRoute=context.folderRoute,staticMetaUrl=context.staticMetaUrl;
  card.classList.add('post-row');card.style.setProperty('--i',String(articleIndexNumber||0));var postIndex=document.createElement('span');postIndex.className='post-index';postIndex.textContent=String((articleIndexNumber||0)+1).padStart(2,'0');var copy=document.createElement('div');copy.className='post-copy';var styleMeta=document.createElement('div');styleMeta.className='post-meta';var styleTime=document.createElement('time');styleTime.textContent=article.date;var styleFolder=document.createElement('span');styleFolder.textContent=(article.series&&article.series[0])||article.folder||'Root';styleMeta.append(styleTime,styleFolder);var styleTitle=document.createElement('h2'),styleLink=document.createElement('a');styleLink.href=article.href;styleLink.textContent=article.title;styleTitle.append(styleLink);var styleDescription=document.createElement('p');styleDescription.className='html-server-blog-card-description';styleDescription.textContent=article.description||'Open this note to continue reading.';var styleTags=document.createElement('div');styleTags.className='tag-line';(article.tags||[]).slice(0,4).forEach(function(tag){var tagLink=document.createElement('button');tagLink.type='button';tagLink.setAttribute('data-style-lab-href',siteUrl('tags/'+encodeURIComponent(encodeURIComponent(tag))+'/'));tagLink.textContent='# '+tag;styleTags.append(tagLink);});copy.append(styleMeta,styleTitle,styleDescription,styleTags);var arrow=document.createElement('div');arrow.className='post-arrow';arrow.setAttribute('aria-hidden','true');arrow.textContent='↗';card.append(postIndex,copy,arrow);return card;
};})();
(function(){
  function closeStyleLabMenu(){document.querySelectorAll('[data-style-lab-menu]').forEach(function(button){button.setAttribute('aria-expanded','false');});document.querySelectorAll('.site-header .main-nav').forEach(function(navigation){navigation.classList.remove('is-open');});}
  var install=function(api){api.registerLayoutHooks("style-lab-literary",{
  ownsThemeTransition:true,
  nextThemeDark:function(){return document.body.dataset.mode!=='dark';},
  applyTheme:function(context){document.body.setAttribute('data-mode',context.dark?'dark':'light');},
  syncThemeButton:function(context){context.button.setAttribute('aria-pressed',String(context.dark));var label=context.button.querySelector('.mode-label');if(label)label.textContent=context.dark?'亮色':'黑色';return true;},
  syncNavigation:function(context){document.querySelectorAll('[data-style-lab-route]').forEach(function(button){var route=button.getAttribute('data-style-lab-route')||'/',target=new URL(context.siteUrl(route.replace(/^[/]+/,'')),location.href),selected=route==='/'?location.pathname===target.pathname:location.pathname.startsWith(target.pathname);selected?button.setAttribute('aria-current','page'):button.removeAttribute('aria-current');});},
  paginationOwnsClicks:true,
  renderPagination:function(context){var host=context.host,page=context.page,count=context.count,total=context.total,onPage=context.onPage;host.replaceChildren();var previous=context.pageButton('上一页',page-1,false,page===1),numbers=document.createElement('div');previous.addEventListener('click',function(){if(!previous.disabled)onPage(page-1,true);});numbers.className='page-numbers';var windowStart=Math.max(1,Math.min(page-2,Math.max(1,count-4))),windowEnd=Math.min(count,windowStart+4);for(var number=windowStart;number<=windowEnd;number++){var numberButton=context.pageButton(String(number).padStart(2,'0'),number,number===page,false);numberButton.addEventListener('click',function(event){onPage(Number(event.currentTarget.getAttribute('data-blog-page')),true);});numbers.append(numberButton);}var summary=document.createElement('span');summary.textContent='第 '+page+' 页，共 '+count+' 页，'+total+' 项';var next=context.pageButton('下一页',page+1,false,page===count);next.addEventListener('click',function(){if(!next.disabled)onPage(page+1,true);});host.append(previous,numbers,summary,next);return true;},
  renderDirectoryItem:function(context){var host=context.host,item=context.item,index=context.index;if(context.kind==='tags'){var tagButton=document.createElement('button');tagButton.type='button';tagButton.setAttribute('data-style-lab-href',item.href);tagButton.style.setProperty('--i',String(index));var tagName=document.createElement('span');tagName.textContent=item.value;var tagHint=document.createElement('small');tagHint.textContent='Browse related notes';var tagCount=document.createElement('strong');tagCount.textContent=String(item.count).padStart(2,'0');tagButton.append(tagName,tagHint,tagCount);host.append(tagButton);return true;}if(context.kind==='series'){var card=document.createElement('article');card.className='series-card';card.style.setProperty('--i',String(index));var number=document.createElement('div');number.className='series-number';number.textContent=item.count+' 篇';var heading=document.createElement('h2');heading.textContent=item.value;var copy=document.createElement('p');copy.textContent=item.description||'Read this collection as a connected tutorial.';var list=document.createElement('ol');(item.articles||[]).forEach(function(article){var row=document.createElement('li'),articleLink=document.createElement('a');articleLink.href=article.href;articleLink.textContent=article.title;row.append(articleLink);list.append(row);});var open=document.createElement('button');open.type='button';open.setAttribute('data-style-lab-href',item.href);open.textContent='打开系列目录';card.append(number,heading,copy,list,open);host.append(card);return true;}return false;},
  handlePageClick:function(event,services){
    var direct=event.target.closest&&event.target.closest('[data-style-lab-href]');if(direct&&event.button===0&&!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&!event.altKey){event.preventDefault();services.loadBlogPage(new URL(direct.getAttribute('data-style-lab-href'),location.href).href,true);return;}
    var control=event.target.closest&&event.target.closest('[data-style-lab-route]');if(!control||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;event.preventDefault();closeStyleLabMenu();document.querySelectorAll('[data-style-lab-route]').forEach(function(item){item===control?item.setAttribute('aria-current','page'):item.removeAttribute('aria-current');});var route=control.getAttribute('data-style-lab-route')||'/';services.closeRelated();services.closeGlobalSearch();services.closeFolderBrowser();services.loadBlogPage(services.siteUrl(route.replace(/^[/]+/,'')),true);
  }});};var api=window.HtmlServerBlog;if(api&&typeof api.registerLayoutHooks==='function')install(api);else(window.__htmlServerBlogContributions=window.__htmlServerBlogContributions||[]).push(install);
  document.querySelectorAll('[data-style-lab-menu]').forEach(function(button){button.addEventListener('click',function(){var header=button.closest('.site-header'),navigation=header&&header.querySelector('.main-nav'),open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));if(navigation)navigation.classList.toggle('is-open',open);});});
})();
(async function(){
  var body = document.body;
  var themeImageGroups={};
  try{var themeImageGroupsNode=document.querySelector('[data-blog-theme-image-groups]');themeImageGroups=themeImageGroupsNode?JSON.parse(themeImageGroupsNode.textContent||'{}'):{};}catch(error){themeImageGroups={};}
  
  (function(){
  var config=(window.__htmlServerPlugins&&window.__htmlServerPlugins['blog-live2d'])||{};
  if(config.enabled!==true||window.__htmlServerLive2dMounted)return;
  var modelUrl=config.modelAssetPath?(String(config.assetBaseUrl||'').replace(/\/$/,'')+'/'+String(config.modelAssetPath).replace(/^\//,'')):config.modelUrl;
  if(!modelUrl)return;
  var scriptUrl=config.localScriptUrl;
  if(config.scriptFrom==='jsdelivr')scriptUrl='https://cdn.jsdelivr.net/npm/live2d-widget@3.1.4/lib/L2Dwidget.min.js';
  else if(config.scriptFrom==='unpkg')scriptUrl='https://unpkg.com/live2d-widget@3.1.4/lib/L2Dwidget.min.js';
  else if(config.scriptFrom==='custom')scriptUrl=config.customScriptUrl;
  if(!scriptUrl)return;
  var mount=function(){
    if(!window.L2Dwidget||window.__htmlServerLive2dMounted)return;
    window.__htmlServerLive2dMounted=true;
    document.body.dataset.blogLive2dEnabled='true';
    document.body.dataset.blogLive2dModel=String(config.model||'');
    window.L2Dwidget.init({
      pluginRootPath:config.pluginRootPath||'live2dw/',pluginJsPath:config.pluginJsPath||'lib/',pluginModelPath:config.pluginModelPath||'assets/',
      tagMode:config.tagMode===true,debug:config.debug===true,log:config.log===true,
      model:{jsonPath:modelUrl,scale:Number(config.modelScale)||1,hHeadPos:Number(config.hHeadPos),vHeadPos:Number(config.vHeadPos)},
      display:{superSample:Number(config.superSample)||2,width:Number(config.width)||200,height:Number(config.height)||450,position:config.position==='left'?'left':'right',hOffset:Number(config.hOffset)||0,vOffset:Number(config.vOffset)||0},
      mobile:{show:config.mobileShow===true,scale:Number(config.mobileScale)||0.5},
      react:{opacity:Number(config.opacity),opacityDefault:Number(config.opacityDefault),opacityOnHover:Number(config.opacityOnHover)}
    });
  };
  if(window.L2Dwidget){mount();return;}
  var existing=document.querySelector('script[data-html-server-live2d-script]');
  if(existing){existing.addEventListener('load',mount,{once:true});return;}
  var script=document.createElement('script');script.src=scriptUrl;script.async=true;script.dataset.htmlServerLive2dScript='true';script.addEventListener('load',mount,{once:true});document.body.append(script);
})();
(function(){
  var config=(window.__htmlServerPlugins&&window.__htmlServerPlugins['blog-canvas-nest'])||{};
  if(config.enabled!==true||window.__htmlServerCanvasNestMounted)return;
  var canvas=document.createElement('canvas'),scripts=document.getElementsByTagName('script'),width=0,height=0,context=canvas.getContext('2d'),raf=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(callback){return setTimeout(callback,1000/45);},random=Math.random,mouse={x:null,y:null,max:20000},points=[],color=String(config.color||'0,0,0'),count=Math.max(1,Math.round(Number(config.count)||99));
  window.__htmlServerCanvasNestMounted=true;
  canvas.id='c_n'+scripts.length;
  canvas.setAttribute('data-blog-canvas-nest','');
  var zIndex=Number(config.zIndex);canvas.style.cssText='position:fixed;top:0;left:0;z-index:'+String(Number.isFinite(zIndex)?zIndex:-1)+';opacity:'+String(Number.isFinite(Number(config.opacity))?Number(config.opacity):.5);
  document.body.appendChild(canvas);
  function size(){width=canvas.width=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;height=canvas.height=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;}
  function draw(){context.clearRect(0,0,width,height);var candidates=[mouse].concat(points);points.forEach(function(point){point.x+=point.xa;point.y+=point.ya;point.xa*=point.x>width||point.x<0?-1:1;point.ya*=point.y>height||point.y<0?-1:1;context.fillRect(point.x-.5,point.y-.5,1,1);for(var index=0;index<candidates.length;index++){var candidate=candidates[index];if(point!==candidate&&candidate.x!==null&&candidate.y!==null){var dx=point.x-candidate.x,dy=point.y-candidate.y,distance=dx*dx+dy*dy;if(distance<candidate.max){if(candidate===mouse&&distance>=candidate.max/2){point.x-=.03*dx;point.y-=.03*dy;}var alpha=(candidate.max-distance)/candidate.max;context.beginPath();context.lineWidth=alpha/2;context.strokeStyle='rgba('+color+','+(alpha+.2)+')';context.moveTo(point.x,point.y);context.lineTo(candidate.x,candidate.y);context.stroke();}}}candidates.splice(candidates.indexOf(point),1);});raf(draw);}
  size();
  for(var index=0;index<count;index++)points.push({x:random()*width,y:random()*height,xa:2*random()-1,ya:2*random()-1,max:6000});
  window.addEventListener('resize',size,{passive:true});
  window.addEventListener('mousemove',function(event){mouse.x=event.clientX;mouse.y=event.clientY;},{passive:true});
  window.addEventListener('mouseout',function(){mouse.x=null;mouse.y=null;},{passive:true});
  setTimeout(draw,100);
})();
  var mainLoadingClass=body.dataset.blogMainLoadingClass||'is-loading';
  var overviewLoadingClass=body.dataset.blogOverviewLoadingClass||'is-loading';
  var folderLoadingClass=body.dataset.blogFolderLoadingClass||'is-loading';
  var pendingEarlyAction='';
  document.addEventListener('click',function(event){
    if(body.dataset.blogRuntimeReady==='true')return;
    var trigger=event.target.closest&&event.target.closest('[data-blog-search-open],[data-blog-folder-open]');if(!trigger)return;
    event.preventDefault();event.stopImmediatePropagation();pendingEarlyAction=trigger.hasAttribute('data-blog-search-open')?'search':'folder';
    var closeScope=body.dataset.blogMobileMenuCloseScope;if(closeScope&&trigger.closest(closeScope)){body.classList.remove('html-server-blog-menu-open');document.documentElement.classList.remove('html-server-blog-menu-open');}
  },true);
  function mountScrollableTables(root){var skipSelector=body.dataset.blogTableSkipSelector;(root||document).querySelectorAll('.markdown-rendered table').forEach(function(table){if(table.closest('.table-wrap,.table-wrapper')||(skipSelector&&table.closest(skipSelector)))return;var wrap=document.createElement('div');wrap.className='table-wrap html-server-blog-table-scroll';table.before(wrap);wrap.append(table);});}
  var layoutContentMounts=[];
  
  function mountArticleOutdateNotice(root){
    if(body.dataset.blogOutdateNoticeEnabled!=='true')return;
    var scope=root||document,article=scope.matches&&scope.matches('.html-server-blog-reading-view[data-blog-post-update]')?scope:scope.querySelector('.html-server-blog-reading-view[data-blog-post-update]');
    if(!article)return;
    var current=article.querySelector(':scope>.post-outdate-notice'),postUpdate=new Date(article.getAttribute('data-blog-post-update')||''),diffDay=parseInt((new Date().getTime()-postUpdate.getTime())/(1000*60*60*24)),limitDay=Math.max(1,parseInt(body.dataset.blogOutdateNoticeDays||'30')||30);
    if(!Number.isFinite(diffDay)||diffDay<limitDay){if(current)current.remove();return;}
    var message='It has been '+diffDay+' days since the last update, the content of the article may be outdated.';
    if(current){current.textContent=message;return;}
    var notice=document.createElement('div');notice.className='post-outdate-notice';notice.textContent=message;article.insertBefore(notice,article.firstChild);
  }
  function mountPublishedContent(root){mountScrollableTables(root);mountArticleOutdateNotice(root);layoutContentMounts.forEach(function(mount){mount(root);});}
  mountPublishedContent(document);
  document.addEventListener('html-server:after-page-mount',function(event){mountPublishedContent(event.detail&&event.detail.main||document);});

  document.addEventListener('error',function(event){
    var image=event.target;if(!(image instanceof HTMLImageElement)||!image.hasAttribute('data-blog-theme-cover'))return;
    if(!image.dataset.blogCoverFallbackTried&&image.dataset.blogCoverBase&&image.src!==image.dataset.blogCoverBase){image.dataset.blogCoverFallbackTried='true';image.src=image.dataset.blogCoverBase;return;}
    image.hidden=true;
  },true);
  var scrollRoot = document.querySelector('.html-server-blog-app');
  function scrollPageTop(){
    if(body.dataset.blogScrollMode==='window'){window.scrollTo({top:0,behavior:'instant'});return;}
    var bodyStyle=getComputedStyle(body),bodyScrolls=(bodyStyle.overflowY==='auto'||bodyStyle.overflowY==='scroll')&&body.scrollHeight>body.clientHeight+1;
    if(bodyScrolls)body.scrollTo({top:0,behavior:'instant'});
    else if(scrollRoot&&scrollRoot.scrollHeight>scrollRoot.clientHeight+1)scrollRoot.scrollTo({top:0,behavior:'instant'});
    else window.scrollTo({top:0,behavior:'instant'});
  }
  function scrollPaginationStart(container){
    var firstItem=container&&container.firstElementChild;
    if(body.dataset.blogPaginationScroll==='item'&&firstItem)firstItem.scrollIntoView({block:'start',behavior:'instant'});
    else scrollPageTop();
  }
  var progressNodes=document.querySelectorAll('[data-blog-progress][data-blog-runtime-progress]'),navigationProgress=progressNodes[0]||null,progressSequence=0,progressHideTimer=0;
  function pinNavigationProgress(){
    if(body.dataset.blogPinProgress!=='true'||!navigationProgress)return;
    document.querySelectorAll('[data-blog-progress]').forEach(function(node){if(navigationProgress&&node!==navigationProgress)node.remove();});
    if(navigationProgress.parentElement!==document.documentElement)document.documentElement.append(navigationProgress);
    navigationProgress.setAttribute('data-theme',body.dataset.theme||'');
    var style=navigationProgress.style;
    style.setProperty('position','fixed','important');style.setProperty('top','0','important');style.setProperty('right','0','important');style.setProperty('bottom','auto','important');style.setProperty('left','0','important');
    style.setProperty('width','100vw','important');style.setProperty('max-width','none','important');style.setProperty('margin','0','important');style.setProperty('transform','none','important');style.setProperty('z-index','2147483647','important');
  }
  pinNavigationProgress();
  document.addEventListener('html-server:after-page-mount',pinNavigationProgress);
  function beginPageProgress(){
    var token=++progressSequence;if(!navigationProgress)return token;
    pinNavigationProgress();
    if(progressHideTimer)clearTimeout(progressHideTimer);
    navigationProgress.dataset.progressState='loading';navigationProgress.setAttribute('aria-hidden','false');navigationProgress.removeAttribute('aria-valuenow');
    return token;
  }
  function finishPageProgress(token){
    if(!navigationProgress||token!==progressSequence)return Promise.resolve();
    navigationProgress.dataset.progressState='complete';navigationProgress.setAttribute('aria-valuenow','100');
    return new Promise(function(resolve){progressHideTimer=setTimeout(function(){if(token===progressSequence){navigationProgress.dataset.progressState='idle';navigationProgress.setAttribute('aria-hidden','true');navigationProgress.removeAttribute('aria-valuenow');}resolve();},260);});
  }
  function hardNavigate(href,replace){
    var target=new URL(href,location.href);
    if(target.origin===location.origin){
      
      beginPageProgress();
    }
    if(replace)location.replace(target.href);else location.assign(target.href);
  }
  window.HtmlServerHardNavigation=hardNavigate;
  window.HtmlServerPageProgress={start:beginPageProgress,complete:finishPageProgress};
  var layoutHooks=new Map(),optionalRuntimeApi={};
  
  window.HtmlServerBlog=Object.assign({
    registerLayoutHooks:function(id,hooks){if(id&&hooks)layoutHooks.set(id,Object.assign({},layoutHooks.get(id)||{},hooks));},
    getLayoutHooks:function(){return layoutHooks.get(body.dataset.blogLayout)||{};}
  },optionalRuntimeApi);
  function currentLayoutHooks(){return window.HtmlServerBlog.getLayoutHooks();}
  (window.__htmlServerBlogContributions||[]).splice(0).forEach(function(install){try{install(window.HtmlServerBlog);}catch(error){console.error('[html-server] Unable to install blog runtime contribution',error);}});
  var missingPath = document.querySelector('[data-blog-not-found-path]');
  if (missingPath) {
    try { missingPath.textContent = new URLSearchParams(location.search).get('path') || missingPath.textContent; } catch (error) {}
  }
  var sidebar = document.querySelector('[data-blog-sidebar]');
  var scrim = document.querySelector('[data-blog-scrim]');
  var course = document.querySelector('[data-blog-course]');
  var courseToggle = document.querySelector('[data-blog-course-toggle]');
  var courseHeaderToggle = document.querySelector('[data-blog-course-header-toggle]');
  var courseScrollHandoff = document.querySelector('[data-blog-course-scroll-handoff]');
  async function preparePageMain(incoming,targetUrl){
    var replacement=document.importNode(incoming,true);
    replacement.querySelectorAll('[href],[src]').forEach(function(element){
      ['href','src'].forEach(function(attribute){var value=element.getAttribute(attribute);if(!value||value[0]==='#'||/^(?:data:|blob:|mailto:|tel:|javascript:)/i.test(value))return;try{element.setAttribute(attribute,new URL(value,targetUrl).href);}catch(error){}});
    });
    replacement.querySelectorAll('.html-server-blog-reading-view img').forEach(function(image,index){
      image.setAttribute('loading',index===0?'eager':'lazy');
      image.setAttribute('decoding','async');
    });
    if(document.fonts&&document.fonts.ready)await Promise.race([document.fonts.ready,new Promise(function(resolve){setTimeout(resolve,1200);})]);
    return replacement;
  }
  function commitPageMain(currentMain,replacement,pageState){return new Promise(function(resolve){requestAnimationFrame(function(){if(pageState){if(pageState.page)body.dataset.page=pageState.page;if(pageState.blogPageKind)body.dataset.blogPageKind=pageState.blogPageKind;}currentMain.replaceWith(replacement);requestAnimationFrame(resolve);});});}
  function setCourseCollapsed(collapsed){
    if (!course || (!courseToggle && !courseHeaderToggle)) return;
    course.classList.toggle('is-collapsed', collapsed);
    if(courseToggle)courseToggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
    if(courseHeaderToggle)courseHeaderToggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
  }
  var courseMobileBreakpoint=body.dataset.blogCourseMobileBreakpoint||'880px';
  if (course && body.dataset.blogCourseMobileCollapse!=='false' && matchMedia('(max-width: '+courseMobileBreakpoint+')').matches) setCourseCollapsed(true);
  else if(course)setCourseCollapsed(false);
  if (courseToggle) {
    courseToggle.addEventListener('click', function(event){
      if(event.target.closest&&event.target.closest('a'))return;
      setCourseCollapsed(!course.classList.contains('is-collapsed'));
    });
    courseToggle.addEventListener('keydown', function(event){
      if(event.key!=='Enter'&&event.key!==' ')return;
      event.preventDefault();setCourseCollapsed(!course.classList.contains('is-collapsed'));
    });
  }
  if (courseHeaderToggle) {
    courseHeaderToggle.addEventListener('click', function(event){
      if(event.target.closest&&event.target.closest('a,[data-blog-course-toggle]'))return;
      setCourseCollapsed(!course.classList.contains('is-collapsed'));
    });
  }
  if (courseScrollHandoff && scrollRoot) {
    function courseScrollContainer(){
      if(courseScrollHandoff.scrollHeight>courseScrollHandoff.clientHeight+1)return courseScrollHandoff;
      return courseScrollHandoff.closest('[data-blog-course]')||courseScrollHandoff;
    }
    var courseTouchY = null;
    courseScrollHandoff.addEventListener('touchstart', function(event){
      courseTouchY=event.touches.length===1?event.touches[0].clientY:null;
    }, {passive:true});
    courseScrollHandoff.addEventListener('touchmove', function(event){
      if(courseTouchY===null||event.touches.length!==1)return;
      var nextY=event.touches[0].clientY,delta=courseTouchY-nextY;courseTouchY=nextY;
      if(Math.abs(delta)<.5)return;
      var inner=courseScrollContainer();
      var innerMax=Math.max(0,inner.scrollHeight-inner.clientHeight);
      var atBoundary=delta>0?inner.scrollTop>=innerMax-1:inner.scrollTop<=1;
      if(!atBoundary)return;
      var outerMax=Math.max(0,scrollRoot.scrollHeight-scrollRoot.clientHeight);
      var outerNext=Math.min(outerMax,Math.max(0,scrollRoot.scrollTop+delta));
      if(Math.abs(outerNext-scrollRoot.scrollTop)<.5)return;
      if(event.cancelable)event.preventDefault();
      scrollRoot.scrollTop=outerNext;
    }, {passive:false});
    var resetCourseTouch=function(){courseTouchY=null;};
    courseScrollHandoff.addEventListener('touchend',resetCourseTouch,{passive:true});
    courseScrollHandoff.addEventListener('touchcancel',resetCourseTouch,{passive:true});
  }
  var themeScrollbarTimers = new WeakMap();
  document.addEventListener('scroll', function(event){
    var target = event.target;
    if (!(target instanceof Element) || !target.matches('.html-server-blog-app,.html-server-blog-search-results,.html-server-blog-folder-browser,.series-tree > nav')) return;
    target.classList.add('html-server-theme-scrollbar-visible');
    var previousTimer = themeScrollbarTimers.get(target);
    if (previousTimer) clearTimeout(previousTimer);
    themeScrollbarTimers.set(target, setTimeout(function(){
      target.classList.remove('html-server-theme-scrollbar-visible');
      themeScrollbarTimers.delete(target);
    }, 900));
  }, true);
  if (course) {
    var courseNav = course.querySelector('nav'), courseScrollbarTimer = 0;
    function courseArticleKey(href){
      try {
        var pathname=new URL(href,location.href).pathname;
        try{pathname=decodeURIComponent(pathname);}catch(error){}
        pathname=pathname.replace(/^[/]series[/][^/]+[/]articles(?=[/])/,'');
        return pathname.replace(/[/]index[.]html$/i,'/').replace(/[.]md[/]?$/i,'/').replace(/[/]+$/,'')||'/';
      } catch (error) { return ''; }
    }
    function currentSeriesArticleLink(href){
      var key=courseArticleKey(href); if(!key)return null;
      return Array.from(courseNav.querySelectorAll('a.tree-document')).find(function(link){return courseArticleKey(link.href)===key;})||null;
    }
    function revealCourseScrollbar(){
      courseNav.classList.add('html-server-blog-course-scrollbar-visible');
      if (courseScrollbarTimer) clearTimeout(courseScrollbarTimer);
      courseScrollbarTimer = setTimeout(function(){ courseNav.classList.remove('html-server-blog-course-scrollbar-visible'); }, 1200);
    }
    ['scroll', 'wheel', 'pointermove', 'focusin'].forEach(function(type){ courseNav.addEventListener(type, revealCourseScrollbar, { passive: true }); });
    var coursePopover = document.createElement('div'); coursePopover.className = 'html-server-blog-course-popover'; coursePopover.hidden = true; document.body.append(coursePopover);
    function courseLabelFromEvent(event){
      var direct = event.target.closest && event.target.closest('[data-course-label]');
      return direct || (event.type === 'focusin' && event.target.querySelector && event.target.querySelector('[data-course-label]'));
    }
    var activeCourseLabel = null;
    function showCoursePopover(event){
      var label = courseLabelFromEvent(event);
      if (!label || label.scrollWidth <= label.clientWidth) { hideCoursePopover(); return; }
      activeCourseLabel = label;
      coursePopover.textContent = label.getAttribute('data-course-label'); coursePopover.hidden = false;
      var rect = label.getBoundingClientRect(), popoverRect = coursePopover.getBoundingClientRect();
      coursePopover.style.left = Math.max(8, Math.min(rect.left, innerWidth - popoverRect.width - 8)) + 'px';
      coursePopover.style.top = Math.max(8, Math.min(rect.bottom + 7, innerHeight - popoverRect.height - 8)) + 'px';
    }
    function hideCoursePopover(){ activeCourseLabel = null; coursePopover.hidden = true; }
    course.addEventListener('mouseover', showCoursePopover);
    course.addEventListener('mouseout', function(event){
      var label = courseLabelFromEvent(event);
      if (label && label === activeCourseLabel && (!event.relatedTarget || !label.contains(event.relatedTarget))) hideCoursePopover();
    });
    course.addEventListener('focusin', showCoursePopover);
    course.addEventListener('focusout', hideCoursePopover);
    courseNav.addEventListener('scroll', hideCoursePopover, { passive: true });
    var courseRequest = 0;
    async function loadCourseChapter(href, pushState){
      var request = ++courseRequest, progressToken=beginPageProgress(), currentMain = document.querySelector('[data-blog-course-page] [data-blog-main]');
      currentMain.classList.add(mainLoadingClass); hideCoursePopover();
      try {
        var response = await fetch(href, { credentials: 'same-origin' }); if (!response.ok) throw new Error('Chapter request failed');
        var parsed = new DOMParser().parseFromString(await response.text(), 'text/html');
        var incoming = parsed.querySelector('[data-blog-course-page] [data-blog-main]');
        if (!incoming || request !== courseRequest) return;
        var target = new URL(href, location.href), replacement = await preparePageMain(incoming,target);
        if(request!==courseRequest)return;
        document.dispatchEvent(new CustomEvent('html-server:before-page-unmount',{detail:{href:href,status:response.status}}));
        await commitPageMain(currentMain,replacement);
        await executePageScripts(replacement,target);if(request!==courseRequest)return;
        var active = null;
        courseNav.querySelectorAll('a').forEach(function(link){
          var selected = courseArticleKey(link.href) === courseArticleKey(target.href); selected ? link.setAttribute('aria-current', 'page') : link.removeAttribute('aria-current'); if (selected) active = link;
        });
        if (active) { var parent = active.parentElement; while (parent && parent !== courseNav) { if (parent.tagName === 'DETAILS') parent.open = true; parent = parent.parentElement; } }
        // Push while the current history entry still owns its original title.
        // Setting document.title first makes Chromium persist the destination
        // title on the entry we are leaving, so Back restores the right DOM but
        // leaves the browser title from the newer page behind.
        if (pushState) history.pushState({ htmlServerSeries: true }, '', target.pathname + target.search + target.hash);
        document.title = parsed.title;
        await mountPageDataControls();if(body.getAttribute('data-blog-controls-state')!=='failed')body.setAttribute('data-blog-controls-state','mounted');
        document.dispatchEvent(new CustomEvent('html-server:after-page-mount',{detail:{href:target.href,main:replacement}}));
        scrollPageTop();
      } catch (error) {
        if (request === courseRequest) hardNavigate(href,false);
      } finally {
        var main = document.querySelector('[data-blog-course-page] [data-blog-main]'); if (main) main.classList.remove(mainLoadingClass);
        finishPageProgress(progressToken);
      }
    }
    document.addEventListener('click', function(event){
      var link = event.target.closest('[data-blog-course] a, [data-blog-chapter-navigation] a');
      if(!link){
        var articleLink=event.target.closest('[data-blog-course-page] .html-server-blog-reading-view a');
        if(articleLink){
          var requested=new URL(articleLink.href,location.href);
          if(requested.origin===location.origin&&!(requested.hash&&courseArticleKey(requested.href)===courseArticleKey(location.href))){
            var seriesLink=currentSeriesArticleLink(requested.href);
            if(seriesLink){
              var seriesTarget=new URL(seriesLink.href,location.href);
              requested.searchParams.forEach(function(value,key){if(key!=='series')seriesTarget.searchParams.set(key,value);});
              seriesTarget.hash=requested.hash; link={href:seriesTarget.href};
            }
          }
        }
      }
      if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      var target = new URL(link.href, location.href); if (target.origin !== location.origin || !target.searchParams.get('series')) return;
      event.preventDefault(); loadCourseChapter(target.href, true);
    });
    addEventListener('popstate', function(){ if (new URL(location.href).searchParams.get('series')) loadCourseChapter(location.href, false); });
  }
  function setMenuOpen(open){
    body.classList.toggle('html-server-blog-menu-open', open);
    document.documentElement.classList.toggle('html-server-blog-menu-open', open);
    if (!open && sidebar) {
      sidebar.classList.remove('html-server-blog-sidebar-dragging');
      sidebar.style.removeProperty('--html-server-blog-drawer-x');
      if (scrim) scrim.style.removeProperty('--html-server-blog-scrim-opacity');
    }
  }
  function closeMenu(){ setMenuOpen(false); }
  document.querySelectorAll('[data-blog-menu]').forEach(function(button){
    button.addEventListener('click', function(){ setMenuOpen(!body.classList.contains('html-server-blog-menu-open')); });
  });
  function syncLayoutNavigation(){var hooks=currentLayoutHooks();if(hooks&&typeof hooks.syncNavigation==='function')hooks.syncNavigation({siteUrl:siteUrl});}
  if (scrim) scrim.addEventListener('click', closeMenu);
  if (sidebar) sidebar.addEventListener('click', function(event){
    var action=event.target.closest('a,button');
    if (action && (action.tagName === 'A' || body.dataset.blogMobileMenuCloseScope&&action.closest(body.dataset.blogMobileMenuCloseScope))) closeMenu();
  });
  if (sidebar) {
    var drawerGesture = null;
    sidebar.addEventListener('touchstart', function(event){
      if (!body.classList.contains('html-server-blog-menu-open') || event.touches.length !== 1) return;
      var touch = event.touches[0];
      drawerGesture = { startX: touch.clientX, startY: touch.clientY, lastX: touch.clientX, lastTime: performance.now(), velocity: 0, horizontal: null };
      sidebar.classList.add('html-server-blog-sidebar-dragging');
    }, { passive: true });
    sidebar.addEventListener('touchmove', function(event){
      if (!drawerGesture || event.touches.length !== 1) return;
      var touch = event.touches[0], dx = touch.clientX - drawerGesture.startX, dy = touch.clientY - drawerGesture.startY;
      if (drawerGesture.horizontal === null && Math.max(Math.abs(dx), Math.abs(dy)) >= 8) drawerGesture.horizontal = Math.abs(dx) > Math.abs(dy) * 1.15;
      if (!drawerGesture.horizontal) return;
      event.preventDefault();
      var now = performance.now(), elapsed = Math.max(1, now - drawerGesture.lastTime);
      drawerGesture.velocity = (touch.clientX - drawerGesture.lastX) / elapsed;
      drawerGesture.lastX = touch.clientX; drawerGesture.lastTime = now;
      var rightDrawer = body.dataset.blogDrawerSide === 'right';
      var offset = rightDrawer ? Math.max(0, Math.min(sidebar.offsetWidth, dx)) : Math.min(0, Math.max(-sidebar.offsetWidth, dx));
      sidebar.style.setProperty('--html-server-blog-drawer-x', offset + 'px');
      if (scrim) scrim.style.setProperty('--html-server-blog-scrim-opacity', String(Math.max(0, 1 - Math.abs(offset) / sidebar.offsetWidth)));
    }, { passive: false });
    function finishDrawerGesture(event){
      if (!drawerGesture) return;
      var gesture = drawerGesture; drawerGesture = null;
      var touch = event.changedTouches && event.changedTouches[0];
      var dx = touch ? touch.clientX - gesture.startX : 0;
      var rightDrawer = body.dataset.blogDrawerSide === 'right';
      var shouldClose = gesture.horizontal && (rightDrawer
        ? (dx > Math.min(88, sidebar.offsetWidth * 0.28) || gesture.velocity > 0.5)
        : (dx < -Math.min(88, sidebar.offsetWidth * 0.28) || gesture.velocity < -0.5));
      sidebar.classList.remove('html-server-blog-sidebar-dragging');
      sidebar.style.removeProperty('--html-server-blog-drawer-x');
      if (scrim) scrim.style.removeProperty('--html-server-blog-scrim-opacity');
      if (shouldClose) closeMenu();
    }
    sidebar.addEventListener('touchend', finishDrawerGesture, { passive: true });
    sidebar.addEventListener('touchcancel', finishDrawerGesture, { passive: true });
  }
  document.addEventListener('keydown', function(event){
    if (event.key === 'Escape' && body.classList.contains('html-server-blog-menu-open')) closeMenu();
  });
  var themeTransition = null;
  var themeControlVariant=body.dataset.blogThemeControl||'common';
  function syncThemeButton(button,dark){
    button.setAttribute('aria-label',dark?'Switch to light theme':'Switch to dark theme');button.setAttribute('title',dark?'Switch to light theme':'Switch to dark theme');
    var hooks=window.HtmlServerBlog.getLayoutHooks();if(hooks&&typeof hooks.syncThemeButton==='function'&&hooks.syncThemeButton({button:button,dark:dark}))return;
    if(button.closest('[data-blog-sidebar]'))return;
    if(themeControlVariant==='source-day-night'){button.setAttribute('title','昼夜切换');button.setAttribute('aria-label','昼夜切换');return;}
    if(themeControlVariant!=='external')button.textContent=dark?'☀':'◐';
  }
  function applyBlogTheme(dark){
    document.documentElement.setAttribute('data-html-server-theme', dark ? 'dark' : 'light');
    document.documentElement.classList.toggle('theme-dark', dark);
    document.documentElement.classList.toggle('theme-light', !dark);
    document.documentElement.style.backgroundColor = dark ? '#151515' : '#f5f7fa';
    body.classList.toggle('theme-dark', dark); body.classList.toggle('theme-light', !dark);
    var hooks=window.HtmlServerBlog.getLayoutHooks();if(hooks&&typeof hooks.applyTheme==='function')hooks.applyTheme({dark:dark});
    syncThemeCoverImages(dark);
    syncBlogThemeColors();
    document.querySelectorAll('[data-blog-theme]').forEach(function(button){
      syncThemeButton(button,dark);
    });
    try { localStorage.setItem('html-server-blog-theme',dark?'dark':'light');var themeStorageKey=body.dataset.blogThemeStorageKey;if(themeStorageKey)localStorage.setItem(themeStorageKey,dark?'dark':'light'); } catch (error) {}
  }
  function syncThemeCoverImages(dark){
    document.querySelectorAll('img[data-blog-theme-cover]').forEach(function(image){
      var next=dark?image.dataset.blogCoverDark:image.dataset.blogCoverLight;
      if(next&&image.getAttribute('src')!==next){image.hidden=false;delete image.dataset.blogCoverFallbackTried;image.setAttribute('src',next);}
    });
  }
  function transitionBlogTheme(event){
    if (themeTransition) return;
    if(document.activeElement&&document.activeElement.matches&&document.activeElement.matches('input,textarea'))document.activeElement.blur();
    var appScroller=document.querySelector('.html-server-blog-app');
    var appScrollTop=appScroller?appScroller.scrollTop:0;
    if(appScroller)appScroller.scrollLeft=0;
    document.documentElement.scrollLeft=0;body.scrollLeft=0;
    var hooks=window.HtmlServerBlog.getLayoutHooks(),dark=hooks&&typeof hooks.nextThemeDark==='function'?hooks.nextThemeDark():!body.classList.contains('theme-dark');
    if(hooks&&hooks.ownsThemeTransition){applyBlogTheme(dark);return;}
    var reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || reduceMotion) { applyBlogTheme(dark); return; }
    var radius = Math.hypot(innerWidth, innerHeight);
    var directionClass = dark ? 'html-server-theme-to-dark' : 'html-server-theme-to-light';
    document.documentElement.style.setProperty('--html-server-theme-radius', radius + 'px');
    document.documentElement.classList.add(directionClass);
    themeTransition = document.startViewTransition(function(){ applyBlogTheme(dark); });
    themeTransition.updateCallbackDone.catch(function(){ applyBlogTheme(dark); });
    themeTransition.finished.finally(function(){
      document.documentElement.classList.remove(directionClass);
      document.documentElement.style.removeProperty('--html-server-theme-radius');
      if(appScroller){appScroller.scrollLeft=0;appScroller.scrollTop=appScrollTop;}
      document.documentElement.scrollLeft=0;body.scrollLeft=0;
      themeTransition = null;
    });
  }
  document.querySelectorAll('[data-blog-theme]').forEach(function(button){ button.addEventListener('click', transitionBlogTheme); });
  document.addEventListener('click',function(event){
    var title=event.target.closest&&event.target.closest('.callout-title');if(!title)return;
    var callout=title.closest('.callout[data-callout-fold]'),content=callout&&callout.querySelector('.callout-content');if(!content)return;
    event.preventDefault();event.stopImmediatePropagation();
    var collapsed=callout.classList.contains('is-collapsed')||callout.classList.contains('callout-folded')||getComputedStyle(content).display==='none';
    callout.classList.toggle('is-collapsed',!collapsed);callout.classList.toggle('callout-folded',!collapsed);callout.setAttribute('aria-expanded',collapsed?'true':'false');
    var fold=callout.querySelector('.callout-fold');if(fold)fold.classList.toggle('is-collapsed',!collapsed);
    if(collapsed)content.style.removeProperty('display');else content.style.setProperty('display','none','important');
  },true);
  function syncBlogThemeColors(){
    body.style.setProperty('--html-server-blog-text-normal', getComputedStyle(body).color);
  }
  try {
    var themeStorageKey=body.dataset.blogThemeStorageKey,storedTheme=themeStorageKey?(localStorage.getItem(themeStorageKey)||(themeControlVariant==='source-day-night'&&((new Date()).getHours()<=6||(new Date()).getHours()>=18)?'dark':'light')):(document.documentElement.getAttribute('data-html-server-theme')||localStorage.getItem('html-server-blog-theme'));
    if (storedTheme) applyBlogTheme(storedTheme === 'dark');
  } catch (error) {}
  syncBlogThemeColors();
  document.querySelectorAll('[data-blog-theme]').forEach(function(button){
    var dark = body.classList.contains('theme-dark');
    syncThemeButton(button,dark);
  });
  document.querySelectorAll('[data-blog-scroll-top]:not([data-leezhiy-smooth-scroll-top])').forEach(function(button){
    button.addEventListener('click',scrollPageTop);
  });

  var search = document.querySelector('[data-blog-search-input]');
  if (search) search.addEventListener('input', function(){
    var query = search.value.trim().toLowerCase();
    document.querySelectorAll('[data-blog-search]').forEach(function(link){
      link.hidden = query && !link.getAttribute('data-blog-search').includes(query);
    });
    document.querySelectorAll('.html-server-blog-nav-group').forEach(function(group){
      group.hidden = !group.querySelector('[data-blog-search]:not([hidden])');
    });
  });
  var relatedModal = document.querySelector('[data-blog-related-modal]');
  var relatedList = document.querySelector('[data-blog-related-list]');
  var searchModal = document.querySelector('[data-blog-search-modal]');
  var globalSearch = document.querySelector('[data-blog-global-search]');
  var searchForm = document.querySelector('[data-blog-search-form]');
  var searchResults = document.querySelector('[data-blog-search-results]');
  var searchCount = document.querySelector('[data-blog-search-count]');
  var searchPagination = document.querySelector('[data-blog-search-pagination]');
  var searchLoading = document.querySelector('[data-blog-search-loading]');
  var folderModal = document.querySelector('[data-blog-folder-modal]');
  var folderBrowser = document.querySelector('[data-blog-folder-browser]');
  var folderBreadcrumb = document.querySelector('[data-blog-folder-breadcrumb]');
  var folderData = document.querySelector('[data-blog-folder-index]');
  var folderIndex = [], activeFolder = '', initialFolder = '';
  var liveFolderCache = new Map(), folderRequest = 0;
  try { folderIndex = JSON.parse(folderData.textContent); initialFolder = folderData.getAttribute('data-current-folder') || ''; activeFolder = initialFolder; } catch (error) {}
  var articleIndex = [];
  try { articleIndex = JSON.parse(document.querySelector('[data-blog-article-index]').textContent); } catch (error) {}
  // Resolve publish-relative boot URLs once. Client-side navigation changes
  // location.href without re-running this script; retaining a relative value
  // would make nested taxonomy pages request /tags/_assets instead of /_assets.
  var initialDocumentBase = document.baseURI || location.href;
  var staticMetaUrl = window.__htmlServerStaticSearch ? new URL(String(window.__htmlServerStaticSearch), initialDocumentBase).href : '';
  var staticSidebarUrl = window.__htmlServerStaticSidebar ? new URL(String(window.__htmlServerStaticSidebar), initialDocumentBase).href : '';
  var staticManifest = null, staticSearchUrl = staticMetaUrl;
  var staticTagArticleRefs = new Map(), staticSerieArticleRefs = new Map(), staticTaxonomyCounts = {tags:null,series:null};
  var liveDataUrl = window.__htmlServerLiveData || '';
  var metadataUrl = staticMetaUrl;
  var siteRoot = staticMetaUrl ? new URL('../', new URL(staticMetaUrl, location.href)) : new URL('/', location.href);
  function stabilizeStaticShellLinks(){
    if(!staticMetaUrl)return;
    document.querySelectorAll('a[href]').forEach(function(link){
      if(link.closest('[data-blog-main]'))return;
      var value=link.getAttribute('href');if(!value||value[0]==='#'||/^(?:data:|blob:|mailto:|tel:|javascript:)/i.test(value))return;
      try{link.setAttribute('href',new URL(value,initialDocumentBase).href);}catch(error){}
    });
  }
  stabilizeStaticShellLinks();
  var dynamicOverview = document.querySelector('[data-blog-overview-dynamic="true"]');
  var sidebarDataCache = null, sidebarDataRequest = null;
  function fetchWithTimeout(url,options,timeoutMs){
    var controller=typeof AbortController==='function'?new AbortController():null;
    var requestOptions=Object.assign({},options||{});
    if(controller)requestOptions.signal=controller.signal;
    var timer=setTimeout(function(){if(controller)controller.abort();},timeoutMs);
    return fetch(url,requestOptions).then(function(response){clearTimeout(timer);return response;},function(error){clearTimeout(timer);throw error;});
  }
  var initialSidebarRequest = dynamicOverview && staticSidebarUrl
    ? fetchWithTimeout(staticSidebarUrl,{credentials:'same-origin',cache:'default',priority:'high'},8000).then(function(response){if(!response.ok)throw new Error('Static sidebar data request failed');return response.json();})
    : null;
  function requestSidebarData(firstRequest){
    if(sidebarDataCache)return Promise.resolve(sidebarDataCache);
    if(!sidebarDataRequest){
      var sourceRequest=firstRequest||fetchWithTimeout(staticSidebarUrl,{credentials:'same-origin',cache:'default',priority:'high'},8000).then(function(response){if(!response.ok)throw new Error('Static sidebar data request failed');return response.json();});
      sidebarDataRequest=sourceRequest.then(function(data){if(!data||data.version!==1)throw new Error('Unsupported static sidebar data');sidebarDataCache=data;return data;}).catch(function(error){sidebarDataRequest=null;throw error;});
    }
    return sidebarDataRequest;
  }
  function siteUrl(path){ return new URL(String(path || '').replace(/^[/]+/, ''), siteRoot).href; }
  syncLayoutNavigation();
  function articleRoute(path){return String(path||'').replace(/.md$/i,'').split('/').map(encodeURIComponent).join('/')+'/';}
  function folderRoute(folder){
    var value=String(folder||'Root');
    if(!staticMetaUrl)return 'folders/'+encodeURIComponent(encodeURIComponent(value))+'/';
    return 'folders/'+value.split('/').filter(Boolean).flatMap(function(part){return ['_',encodeURIComponent(part)];}).join('/')+'/';
  }
  function staticNotFoundUrl(requestedUrl){
    var requested=new URL(requestedUrl,location.href),fallback=new URL('404.html',siteRoot);
    var rootPath=siteRoot.pathname.replace(/[/]?$/,'/'),missing=decodeURIComponent(requested.pathname.indexOf(rootPath)===0?requested.pathname.slice(rootPath.length):requested.pathname.replace(/^[/]+/,''));
    missing=missing.replace(/[/]index[.]html$/,'').replace(/^index[.]html$/,'');fallback.searchParams.set('path',missing||requested.pathname);return fallback;
  }
  var sharedArticleDateFormatter = new Intl.DateTimeFormat('en', {year:'numeric',month:'short',day:'numeric'});
  var sharedMonthDateFormatter = new Intl.DateTimeFormat('en',{year:'numeric',month:'long'});
  var sharedMetadataRequest = (async function(){
  if (!articleIndex.length && metadataUrl) {
    try {
      var metadataResponse = await fetchWithTimeout(metadataUrl, { credentials: 'same-origin', priority: 'low' }, 10000);
      if (!metadataResponse.ok) throw new Error('Page metadata request failed');
      var metadataPayload = await metadataResponse.json();
      var metadataArticles=metadataPayload.articles||[];
      if(metadataPayload.version>=3&&metadataPayload.files){
        staticManifest=metadataPayload;
        function staticFile(name){return new URL(metadataPayload.files[name],new URL('./',new URL(staticMetaUrl,location.href))).href;}
        staticSearchUrl=staticFile('search');
        var datasetNames=['articles','tags','series','folders','articleRefTag','tagRefArticle','articleRefSerie','serieRefArticle','articleRefFolder','folderRefArticle'];
        var datasets=await Promise.all(datasetNames.map(function(name){return fetchWithTimeout(staticFile(name),{credentials:'same-origin',priority:'low'},15000).then(function(response){if(!response.ok)throw new Error('Static '+name+' metadata request failed');return response.json();});}));
        metadataArticles=datasets[0].articles||[];
        var tagValues=datasets[1].values||[],serieValues=datasets[2].values||[],folderValues=datasets[3].values||[];
        var articleRefTag=datasets[4].refs||{},tagRefArticle=datasets[5].refs||{},articleRefSerie=datasets[6].refs||{},serieRefArticle=datasets[7].refs||{},articleRefFolder=datasets[8].refs||{};
        var tagsById=new Map(tagValues.map(function(entry){return [entry.id,entry.value];})),seriesById=new Map(serieValues.map(function(entry){return [entry.id,entry.value];})),foldersById=new Map(folderValues.map(function(entry){return [entry.id,entry.path||''];}));
        metadataArticles=metadataArticles.map(function(article){return Object.assign({},article,{tags:(articleRefTag[article.id]||[]).map(function(id){return tagsById.get(id);}).filter(Boolean),series:(articleRefSerie[article.id]||[]).map(function(id){return seriesById.get(id);}).filter(Boolean)});});
        folderIndex=metadataArticles.map(function(article){var ids=articleRefFolder[article.id]||[];return {title:article.title,href:siteUrl(articleRoute(article.path)),folder:ids.length?(foldersById.get(ids[0])||''):(article.folder==='Root'?'':article.folder)};});
        tagValues.forEach(function(entry){staticTagArticleRefs.set(String(entry.value).toLowerCase(),tagRefArticle[entry.id]||[]);});
        serieValues.forEach(function(entry){staticSerieArticleRefs.set(String(entry.value).toLowerCase(),serieRefArticle[entry.id]||[]);});
        staticTaxonomyCounts.tags=tagValues.map(function(entry){return [entry.value,entry.count];}).sort(function(a,b){return b[1]-a[1]||a[0].localeCompare(b[0]);});
        staticTaxonomyCounts.series=serieValues.map(function(entry){return [entry.value,entry.count];}).sort(function(a,b){return b[1]-a[1]||a[0].localeCompare(b[0]);});
      }
      articleIndex = metadataArticles.map(function(article){
        var modified = Number(article.modified) || 0;
        return {
          title: article.title || article.path,
          href: staticMetaUrl
            ? siteUrl(articleRoute(article.path))
            : siteUrl(String(article.path || '').split('/').map(encodeURIComponent).join('/')),
          path: article.path || '', folder: article.folder || 'Root', description: article.description || '',
          explicitTitle: article.explicitTitle === true,
          suppressCover: article.suppressCover === true,
          coverUrl: article.coverUrl || '', copyrightType: article.copyrightType || '原创',
          daybookPublishedDate: article.daybookPublishedDate || '', daybookUpdatedDate: article.daybookUpdatedDate || '',
          daybookPin: article.daybookPin === true, pinned: article.pinned === true, daybookHasMusic: article.daybookHasMusic === true,
          daybookHasTranslation: article.daybookHasTranslation === true,
          date: modified ? sharedArticleDateFormatter.format(new Date(modified)) : '',
          tags: article.tags || [], series: article.series || [], created: Number(article.created) || modified, modified: modified
        };
      });
      if(!folderIndex.length)folderIndex = articleIndex.map(function(article){ return {title:article.title,href:article.href,folder:article.folder === 'Root' ? '' : article.folder}; });
    } catch (error) { console.warn('[html-server] Unable to load shared page metadata', error); }
  }
  })();
  function valueCounts(key){
    if(staticTaxonomyCounts[key])return staticTaxonomyCounts[key];
    var counts = new Map(); articleIndex.forEach(function(article){ (article[key] || []).forEach(function(value){ counts.set(value, (counts.get(value) || 0) + 1); }); });
    return Array.from(counts.entries()).sort(function(a,b){ return b[1] - a[1] || a[0].localeCompare(b[0]); });
  }
  function mountNavigation(){
    var navigation = document.querySelector('.html-server-blog-navigation'); if (!navigation) return;
    var groups = new Map(); articleIndex.slice(0, 160).forEach(function(article){
      var folder = article.folder || 'Root'; if (!groups.has(folder)) groups.set(folder, []); groups.get(folder).push(article);
    });
    navigation.replaceChildren(); groups.forEach(function(articles, folder){
      var section = document.createElement('section'); section.className = 'html-server-blog-nav-group';
      var heading = document.createElement('h2'); heading.textContent = folder; section.append(heading);
      articles.forEach(function(article){
        var link = document.createElement('a'); link.href = article.href; link.textContent = article.title;
        link.setAttribute('data-blog-search', [article.title,article.folder].concat(article.tags || [],article.series || []).join(' ').toLowerCase());
        if (new URL(link.href, location.href).pathname === location.pathname) link.setAttribute('aria-current','page');
        section.append(link);
      }); navigation.append(section);
    });
  }
  function mountOverview(sidebarData){
    var overview = document.querySelector('[data-blog-overview]'); if (!overview) return;
    var tags = sidebarData ? (sidebarData.tags||[]).map(function(item){return [item.value,item.count];}) : valueCounts('tags');
    var series = sidebarData ? (sidebarData.series||[]).map(function(item){return [item.value,item.count];}) : valueCounts('series');
    var layoutHooks=currentLayoutHooks();if(layoutHooks&&typeof layoutHooks.mountOverview==='function'&&layoutHooks.mountOverview({overview:overview,sidebarData:sidebarData,tags:tags,series:series,articleIndex:articleIndex,loadingClass:overviewLoadingClass,staticMetaUrl:staticMetaUrl,siteUrl:siteUrl,articleRoute:articleRoute})){overview.setAttribute('data-blog-overview-hydrated','true');return;}
    var counts = overview.querySelector('[data-blog-profile-counts]'); if (counts) {
      var summary=sidebarData&&sidebarData.counts||{articles:articleIndex.length,tags:tags.length,series:series.length};
      counts.replaceChildren(); [['Articles',summary.articles],['Tags',summary.tags],['Series',summary.series]].forEach(function(item){
        var span=document.createElement('span'),strong=document.createElement('strong'); strong.textContent=String(item[1]); span.append(strong,item[0]); counts.append(span);
      });
    }
    var tagCloud = overview.querySelector('[data-blog-overview-tags]'); if (tagCloud) {
      var maximum=tags.length?tags[0][1]:1;
      var byWidth=tags.slice(0,24).sort(function(a,b){
        function width(item){return Array.from(item[0]).reduce(function(total,character){return total+(/[^\u0000-\u00ff]/.test(character)?2:1);},0)+String(item[1]).length+5;}
        return width(b)-width(a);
      });
      var balanced=[],start=0,end=byWidth.length-1;while(start<=end){balanced.push(byWidth[start++]);if(start<=end)balanced.push(byWidth[end--]);}
      tagCloud.replaceChildren(); balanced.forEach(function(item){
        var button=document.createElement('button'); button.type='button'; button.setAttribute('data-blog-related','tag'); button.setAttribute('data-blog-value',item[0]);
        button.style.setProperty('--tag-weight',(0.78+(item[1]/maximum)*0.42).toFixed(2));
        button.textContent='#'+item[0]; var small=document.createElement('small'); small.textContent=String(item[1]); button.append(small); tagCloud.append(button);
      });
      if (!tags.length) tagCloud.textContent='Add tags to note frontmatter to build this cloud.';
    }
    var seriesList = overview.querySelector('[data-blog-overview-series]'); if (seriesList) {
      seriesList.replaceChildren(); series.slice(0,10).forEach(function(item,index){
        var button=document.createElement('button'); button.type='button'; button.setAttribute('data-blog-related','series'); button.setAttribute('data-blog-value',item[0]);
        var rank=document.createElement('span'); rank.className='html-server-blog-series-rank'; rank.textContent=String(index+1).padStart(2,'0');
        var name=document.createElement('span'); name.className='html-server-blog-series-name'; name.textContent=item[0];
        var small=document.createElement('small'); small.textContent=String(item[1]); var em=document.createElement('em'); em.textContent=' notes'; small.append(em); button.append(rank,name,small); seriesList.append(button);
      });
      if (!series.length) seriesList.textContent='Add a series property to note frontmatter to build tutorials.';
    }
    var timeline = overview.querySelector('[data-blog-overview-archive]'); if (timeline) {
      timeline.replaceChildren(); var recentLimit=Math.max(0,Number(timeline.getAttribute('data-blog-overview-limit'))||0);
      if(recentLimit){
        var recentArticles=articleIndex.slice().sort(function(left,right){return Number(right.modified||0)-Number(left.modified||0);});
        if(!recentArticles.length&&sidebarData)recentArticles=(sidebarData.archive||[]).flatMap(function(month){return (month.articles||[]).map(function(article){return {title:article.title,href:siteUrl(articleRoute(article.path))};});});
        var recentItem=document.createElement('li'),recentLinks=document.createElement('div');recentArticles.slice(0,recentLimit).forEach(function(article){var link=document.createElement('a');link.href=article.href;link.textContent=article.title;recentLinks.append(link);});recentItem.append(recentLinks);timeline.append(recentItem);
      }else{
        var archiveMonths=[];
        if(sidebarData)archiveMonths=(sidebarData.archive||[]).map(function(month){return {label:month.label,count:month.count,articles:(month.articles||[]).map(function(article){return {title:article.title,href:siteUrl(articleRoute(article.path))};})};});
        else {var months=new Map();articleIndex.forEach(function(article){
          var date=new Date(article.modified),key=date.getFullYear()+'-'+date.getMonth();
          if (!months.has(key)) months.set(key,{label:sharedMonthDateFormatter.format(date),articles:[]}); months.get(key).articles.push(article);
        });archiveMonths=Array.from(months.values()).slice(0,12);}
        archiveMonths.forEach(function(month){
          var li=document.createElement('li'),time=document.createElement('time'),links=document.createElement('div'),small=document.createElement('small'); time.textContent=month.label;
          month.articles.slice(0,4).forEach(function(article){var link=document.createElement('a');link.href=article.href;link.textContent=article.title;links.append(link);});
          small.textContent=(month.count||month.articles.length)+' notes'; li.append(time,links,small); timeline.append(li);
        });
      }
    }
    overview.classList.remove(overviewLoadingClass);overview.setAttribute('aria-busy','false');
    overview.setAttribute('data-blog-overview-hydrated','true');
    overview.querySelectorAll('a[href^="/"]').forEach(function(link){ if (staticMetaUrl) link.href=siteUrl(link.getAttribute('href').replace(/^[/]+/,'')); });
  }
  function mountOverviewFailure(){
    var overview=document.querySelector('[data-blog-overview]');if(!overview)return;overview.classList.remove(overviewLoadingClass);overview.setAttribute('aria-busy','false');
    ['[data-blog-overview-tags]','[data-blog-overview-series]','[data-blog-overview-archive]'].forEach(function(selector,index){var host=overview.querySelector(selector);if(!host)return;host.replaceChildren();var box=document.createElement(index===2?'li':'div');box.className='html-server-blog-overview-error';box.textContent='Sidebar data is temporarily unavailable.';if(index===0){var retry=document.createElement('button');retry.type='button';retry.textContent='Retry';retry.addEventListener('click',function(){loadDynamicOverview();});box.append(retry);}host.append(box);});
  }
  function loadDynamicOverview(firstRequest){
    var overview=document.querySelector('[data-blog-overview-dynamic="true"]');if(!overview||!staticSidebarUrl)return Promise.resolve();
    if(overview.getAttribute('data-blog-overview-hydrated')==='true')return Promise.resolve();
    overview.classList.add(overviewLoadingClass);overview.setAttribute('aria-busy','true');
    return requestSidebarData(firstRequest).then(function(data){
      var current=document.querySelector('[data-blog-overview-dynamic="true"]');
      if(!current||current.getAttribute('data-blog-overview-hydrated')==='true')return;
      mountOverview(data);
    }).catch(function(error){
      console.warn('[html-server] Unable to load static sidebar data',error);
      var current=document.querySelector('[data-blog-overview-dynamic="true"]');if(!current||current.getAttribute('data-blog-overview-hydrated')==='true')return;
      if(articleIndex.length)mountOverview();else mountOverviewFailure();
    });
  }
  if(dynamicOverview)loadDynamicOverview(initialSidebarRequest);else if(articleIndex.length)mountOverview();
  async function mountPageDataControls(){
  await sharedMetadataRequest;
  function documentListingProjection(articles){
    if(body.dataset.blogDocumentPinning!=='true')return articles;
    var pinned=articles.filter(function(article){return article.pinned===true;});
    if(!pinned.length)return articles;
    var regular=body.dataset.blogDocumentPinningFilterRegular==='true'
      ? articles.filter(function(article){return article.pinned!==true;})
      : articles;
    return pinned.concat(regular);
  }
  await loadDynamicOverview();
  body.setAttribute('data-blog-controls-state','mounting');
  function pageButton(label, target, current, disabled){
    var button = document.createElement('button'); button.type = 'button'; button.textContent = label;
    button.disabled = disabled; button.setAttribute('data-blog-page', String(target));
    if (current) button.setAttribute('aria-current', 'page'); return button;
  }
  function renderLayoutPager(host,page,count,total,onPage){var hooks=currentLayoutHooks();return !!(hooks&&typeof hooks.renderPagination==='function'&&hooks.renderPagination({host:host,page:page,count:count,total:total,onPage:onPage,pageButton:pageButton}));}
  var articleGrid = document.querySelector('[data-blog-article-grid]');
  var pagination = document.querySelector('[data-blog-pagination]');
  if (articleGrid && pagination) {
    var pageSize = Number(pagination.getAttribute('data-blog-page-size')) || 12;
    var articleTotal = Number(pagination.getAttribute('data-blog-total')) || articleIndex.length;
    var pageCount = Math.max(1, Math.ceil(articleTotal / pageSize));
    var articleTaxonomy=articleGrid.getAttribute('data-blog-taxonomy'),articleValue=articleGrid.getAttribute('data-blog-value')||'',articleFolder=articleGrid.getAttribute('data-blog-folder');
    var scopedArticleIndex=articleIndex;
    if(articleTaxonomy){var articleRefMap=articleTaxonomy==='tags'?staticTagArticleRefs:staticSerieArticleRefs,indexedArticleIds=articleRefMap.get(articleValue.toLowerCase());scopedArticleIndex=indexedArticleIds?indexedArticleIds.map(function(id){return articleIndex[id];}).filter(Boolean):articleIndex.filter(function(article){return (article[articleTaxonomy]||[]).some(function(item){return item.toLowerCase()===articleValue.toLowerCase();});});}
    else if(articleFolder!==null)scopedArticleIndex=articleIndex.filter(function(article){return article.folder===(articleFolder||'Root');});
    if(!liveDataUrl){scopedArticleIndex=documentListingProjection(scopedArticleIndex);articleTotal=scopedArticleIndex.length;pagination.setAttribute('data-blog-total',String(articleTotal));pageCount=Math.max(1,Math.ceil(articleTotal/pageSize));}
    var liveArticlePages = new Map(), liveArticleRequests = new Map();
    function fetchLiveArticlePage(page){
      if(liveArticlePages.has(page))return Promise.resolve(liveArticlePages.get(page));
      if(liveArticleRequests.has(page))return liveArticleRequests.get(page);
      var params=new URLSearchParams({kind:'articles',page:String(page),size:String(pageSize)});
      if(articleTaxonomy){params.set('taxonomy',articleTaxonomy);params.set('value',articleValue);}
      if(articleFolder!==null)params.set('folder',articleFolder);
      var request=fetch(liveDataUrl+'?'+params).then(function(response){if(!response.ok)throw new Error('Unable to load article page '+page);return response.json();}).then(function(payload){var items=payload.items||[];liveArticlePages.set(page,items);liveArticleRequests.delete(page);return items;},function(error){liveArticleRequests.delete(page);throw error;});
      liveArticleRequests.set(page,request);return request;
    }
    function articleCover(value){if(!value)return'';if(!staticMetaUrl||/^(?:https?:|data:|blob:)/i.test(value))return value;while(value.charAt(0)==='/')value=value.slice(1);return new URL(value,new URL('./',new URL(staticMetaUrl,location.href))).href;}
    function coverIndex(path,group,position,length){var hash=0,seed=Number.isInteger(position)&&position>=0?group:(path||'');Array.from(seed).forEach(function(character){hash=((hash*31)+character.charCodeAt(0))>>>0;});return (hash+(Number.isInteger(position)&&position>=0?position:0))%length;}
    function themeCover(path,position){var requestedGroup=body.dataset.blogCoverGroup||'original',group=themeImageGroups[requestedGroup]?requestedGroup:themeImageGroups.original?'original':Object.keys(themeImageGroups)[0],definition=themeImageGroups[group],images=definition&&definition.images||[];if(!images.length)return null;var index=coverIndex(path,group,position,images.length),entry=images[index],assetPath=(body.dataset.blogCoverAssets||'theme-covers/thumb').replace(/[/]+$/,''),directory=definition&&typeof definition.directory==='string'?definition.directory:null,relativePath=directory===null?assetPath+'/'+group:assetPath.replace(/\/thumb$/,'')+(directory?'/'+directory:''),base=staticMetaUrl?new URL(relativePath+'/',new URL('./',new URL(staticMetaUrl,location.href))).href:'/.obsidian/plugins/obsidian-http-server/'+relativePath+'/';return{base:base+entry.base,light:base+entry.light,dark:base+entry.dark};}
    function applyThemeCover(image,selection){if(!selection)return;image.dataset.blogCoverBase=selection.base;image.dataset.blogCoverLight=selection.light;image.dataset.blogCoverDark=selection.dark;image.setAttribute('data-blog-theme-cover','');image.src=body.classList.contains('theme-dark')?selection.dark:selection.light;}
    function articleCard(article,articleIndexNumber){
      var card = document.createElement('article'); card.className = 'html-server-blog-card';
      if(typeof window.__htmlServerLayoutArticleCard==='function')return window.__htmlServerLayoutArticleCard({article:article,index:articleIndexNumber,card:card,articleCover:articleCover,applyThemeCover:applyThemeCover,themeCover:themeCover,siteUrl:siteUrl,folderRoute:folderRoute,staticMetaUrl:staticMetaUrl});
      var link = document.createElement('a'); link.className = 'html-server-blog-card-link'; link.href = article.href;
      var top = document.createElement('div'); top.className = 'html-server-blog-card-topline';
      var folder = document.createElement('span'); folder.textContent = article.folder;
      var time = document.createElement('time'); time.textContent = article.date; top.append(folder, time);
      var title = document.createElement('h3'); title.textContent = article.title;
      var description = document.createElement('p'); description.className='html-server-blog-card-description'; description.textContent = article.description || 'Open this note to continue reading.';
      var footer = document.createElement('div'); footer.className = 'html-server-blog-card-footer';
      var tags = document.createElement('span'); tags.textContent = article.tags.slice(0, 3).map(function(tag){ return '#' + tag; }).join(' ');
      var more = document.createElement('span'); more.className = 'html-server-blog-read-more'; more.textContent = 'Read article →';
      footer.append(tags, more); link.append(top, title, description, footer); card.append(link); return card;
    }
    async function renderPage(requestedPage, scroll, initial){
      var page = Math.min(pageCount, Math.max(1, requestedPage));
      var pageArticles=scopedArticleIndex.slice((page - 1) * pageSize, page * pageSize);
      if(liveDataUrl&&!initial){
        pageArticles=await fetchLiveArticlePage(page);
      }
      if(!initial||articleIndex.length){articleGrid.replaceChildren();pageArticles.forEach(function(article,index){ articleGrid.append(articleCard(article,(page-1)*pageSize+index)); });mountPublishedContent(articleGrid);}
      if(!renderLayoutPager(
        pagination,page,pageCount,articleTotal,
        function(target,shouldScroll){return renderPage(target,shouldScroll,false);}
      )){
        pagination.replaceChildren();
        pagination.append(pageButton('←', page - 1, false, page === 1));
        var pages = [];
        for (var i = 1; i <= pageCount; i++) if (i === 1 || i === pageCount || Math.abs(i - page) <= 2) pages.push(i);
        var previous = 0;
        pages.forEach(function(number){
          if (number - previous > 1) { var gap = document.createElement('span'); gap.textContent = '…'; pagination.append(gap); }
          pagination.append(pageButton(String(number), number, number === page, false)); previous = number;
        });
        pagination.append(pageButton('→', page + 1, false, page === pageCount));
      }
      var url = new URL(window.location.href);
      page === 1 ? url.searchParams.delete('page') : url.searchParams.set('page', String(page));
      history.replaceState(null, '', url.pathname + url.search + url.hash);
      if (scroll) scrollPaginationStart(articleGrid);
      if(liveDataUrl&&page<pageCount){var prefetch=function(){fetchLiveArticlePage(page+1).catch(function(){});};if('requestIdleCallback' in window)window.requestIdleCallback(prefetch,{timeout:1200});else setTimeout(prefetch,0);}
    }
    pagination.addEventListener('click', function(event){
      var layoutHooks=currentLayoutHooks();if(layoutHooks&&layoutHooks.paginationOwnsClicks)return;
      var button = event.target.closest('[data-blog-page]'); if (!button || button.disabled) return;
      var targetPage=Number(button.getAttribute('data-blog-page')),hooks=window.HtmlServerBlog&&window.HtmlServerBlog.getLayoutHooks();
      if(hooks&&typeof hooks.paginate==='function'&&hooks.paginate({pagination:pagination,targetPage:targetPage,render:function(){return renderPage(targetPage,true,false);}}))return;
      renderPage(targetPage, true, false);
    });
    renderPage(Number(new URLSearchParams(location.search).get('page')) || 1, false, true).catch(function(error){
      body.setAttribute('data-blog-controls-state','failed');
      body.setAttribute('data-blog-controls-error',String(error&&error.message||error));
      console.error('[html-server] Unable to mount article pagination',error);
    });
  }
  function compactPager(nav, page, pageCount, onPage){
    if(renderLayoutPager(nav,page,pageCount,Number(nav.getAttribute('data-blog-total'))||0,onPage))return;
    nav.replaceChildren();
    function add(label, target, current, disabled){
      var button = document.createElement('button'); button.type = 'button'; button.textContent = label; button.disabled = disabled;
      if (current) button.setAttribute('aria-current', 'page');
      button.addEventListener('click', function(){ if (!button.disabled) onPage(target, true); }); nav.append(button);
    }
    add('←', page - 1, false, page === 1);
    var previous = 0;
    for (var i = 1; i <= pageCount; i++) if (i === 1 || i === pageCount || Math.abs(i - page) <= 2) {
      if (i - previous > 1) { var gap = document.createElement('span'); gap.textContent = '…'; nav.append(gap); }
      add(String(i), i, i === page, false); previous = i;
    }
    add('→', page + 1, false, page === pageCount);
  }
  function storePage(page){
    var url = new URL(location.href); page === 1 ? url.searchParams.delete('page') : url.searchParams.set('page', String(page));
    history.replaceState(null, '', url.pathname + url.search + url.hash);
  }
  var directoryGrid = document.querySelector('[data-blog-directory-grid]');
  var directoryPager = document.querySelector('[data-blog-directory-pagination]');
  var taxonomyData = document.querySelector('[data-blog-taxonomy-index]');
  if (directoryGrid && directoryPager && taxonomyData) {
    var directory = []; try { directory = JSON.parse(taxonomyData.textContent); } catch (error) {}
    var directorySize = Number(directoryPager.getAttribute('data-blog-page-size')) || 60;
    var directoryTotal = Number(directoryPager.getAttribute('data-blog-total')) || directory.length;
    var directoryPages = Math.max(1, Math.ceil(directoryTotal / directorySize));
    var directoryKind = directoryGrid.getAttribute('data-blog-directory-kind');
    function normalizeDirectoryItem(item){var normalized=Object.assign({},item,{href:siteUrl(String(item.href||'').replace(/\/?$/,'/'))});if(Array.isArray(item.children))normalized.children=item.children.map(normalizeDirectoryItem);return normalized;}
    async function renderDirectoryPage(requestedPage, scroll, initial){
      var page = Math.min(directoryPages, Math.max(1, requestedPage)),items=directory.slice((page - 1) * directorySize, page * directorySize);
      var fetched=false;if(liveDataUrl&&!directory.length&&(!initial||page!==1)){var response=await fetch(liveDataUrl+'?'+new URLSearchParams({kind:'taxonomy',taxonomy:directoryKind,page:String(page),size:String(directorySize)}));if(!response.ok)return;items=(await response.json()).items||[];fetched=true;}
      if(!initial||directory.length||fetched){directoryGrid.replaceChildren();items.forEach(function(item,index){
        var normalizedItem=normalizeDirectoryItem(item),itemHref=normalizedItem.href;
        var link = document.createElement('a'); link.href = itemHref;
        var hooks=currentLayoutHooks();if(hooks&&typeof hooks.renderDirectoryItem==='function'&&hooks.renderDirectoryItem({host:directoryGrid,item:normalizedItem,index:index,kind:directoryKind,link:link}))return;
        var name = document.createElement('strong'); name.textContent = (directoryKind === 'tags' ? '#' : '') + item.value;
        var count = document.createElement('span'); count.textContent = item.count + ' articles'; link.append(name, count); directoryGrid.append(link);
      });}
      compactPager(directoryPager, page, directoryPages, function(target,shouldScroll){renderDirectoryPage(target,shouldScroll,false);}); storePage(page);
      if (scroll) scrollPaginationStart(directoryGrid);
    }
    renderDirectoryPage(Number(new URLSearchParams(location.search).get('page')) || 1, false, true);
  }
  var archiveList = document.querySelector('[data-blog-full-archive]');
  var archivePager = document.querySelector('[data-blog-archive-pagination]');
  if (archiveList && archivePager) {
    var archiveSize = Number(archivePager.getAttribute('data-blog-page-size')) || 50;
    var archiveTotal = Number(archivePager.getAttribute('data-blog-total')) || articleIndex.length;
    var archivePages = Math.max(1, Math.ceil(archiveTotal / archiveSize));
    var archiveArticles=articleIndex.slice().sort(function(left,right){return Number(right.created||right.modified||0)-Number(left.created||left.modified||0);});
    var archiveHooks=currentLayoutHooks(),layoutArchiveMounted=archiveHooks&&typeof archiveHooks.mountArchive==='function'&&archiveHooks.mountArchive({host:archiveList,pager:archivePager,pageSize:archiveSize,total:archiveTotal,pageCount:archivePages,articles:articleIndex,liveDataUrl:liveDataUrl,staticMetaUrl:staticMetaUrl,themeImageGroups:themeImageGroups,storePage:storePage,scrollToStart:scrollPaginationStart});
    if(!layoutArchiveMounted){
    function archiveArticle(article){
      var link = document.createElement('a'); link.className = 'html-server-blog-archive-entry'; link.href = article.href;
      var date = new Date(article.modified); var day = document.createElement('time'); day.textContent = String(date.getDate()).padStart(2, '0');
      var title = document.createElement('span'); title.textContent = article.title;
      var meta = document.createElement('small'); meta.textContent = Math.max(1,Math.ceil(((article.description||'').length||120)/80))+' min';
      link.append(day,title,meta); return link;
    }
    async function renderArchivePage(requestedPage, scroll, initial){
      var page = Math.min(archivePages, Math.max(1, requestedPage)),items=archiveArticles.slice((page - 1) * archiveSize, page * archiveSize);
      if(liveDataUrl&&!initial){var response=await fetch(liveDataUrl+'?'+new URLSearchParams({kind:'archive',page:String(page),size:String(archiveSize)}));if(!response.ok)return;items=(await response.json()).items||[];}
      if(!initial||articleIndex.length)archiveList.replaceChildren();
      var groups = new Map(); items.forEach(function(article){
        var date = new Date(article.modified); var key = date.getFullYear() + '-' + date.getMonth();
        if (!groups.has(key)) groups.set(key, {label:sharedMonthDateFormatter.format(date),items:[]});
        groups.get(key).items.push(article);
      });
      groups.forEach(function(group){
        var section = document.createElement('div'); section.className = 'html-server-blog-archive-month archive-month';
        var heading = document.createElement('h2'); heading.textContent = group.label;
        var entries = document.createElement('div'); group.items.forEach(function(article){ entries.append(archiveArticle(article)); });
        section.append(heading,entries); archiveList.append(section);
      });
      compactPager(archivePager, page, archivePages, function(target,shouldScroll){renderArchivePage(target,shouldScroll,false);}); storePage(page);
      if (scroll) scrollPaginationStart(archiveList);
    }
    renderArchivePage(Number(new URLSearchParams(location.search).get('page')) || 1, false, true);
    }
  }
  var timelineHost=document.querySelector('[data-leezhiy-timeline]');
  var timelinePager=document.querySelector('[data-leezhiy-timeline-pagination]');
  if(timelineHost&&timelinePager){
    var timelineHooks=currentLayoutHooks();
    if(timelineHooks&&typeof timelineHooks.mountTimeline==='function')timelineHooks.mountTimeline({
      host:timelineHost,pager:timelinePager,
      pageSize:Number(timelinePager.getAttribute('data-blog-page-size'))||10,
      total:Number(timelinePager.getAttribute('data-blog-total'))||0,
      articles:articleIndex,
      kind:timelineHost.getAttribute('data-leezhiy-timeline-kind')||'',
      value:timelineHost.getAttribute('data-leezhiy-timeline-value')||'',
      liveDataUrl:liveDataUrl,storePage:storePage,scrollToStart:scrollPaginationStart
    });
  }
  }
  async function mountResolvedPageData(){
    try {
      if(articleIndex.length)mountNavigation();
      await mountPageDataControls();
      if(body.getAttribute('data-blog-controls-state')!=='failed')body.setAttribute('data-blog-controls-state','mounted');
    } catch(error) {
      body.setAttribute('data-blog-controls-state','failed');
      body.setAttribute('data-blog-controls-error',String(error&&error.message||error));
      console.error('[html-server] Unable to mount blog controls',error);
    }
  }
  try {
    body.setAttribute('data-blog-controls-state','loading');
    sharedMetadataRequest.then(mountResolvedPageData,mountResolvedPageData);
  } catch(error) {
    body.setAttribute('data-blog-controls-state','failed');

    body.setAttribute('data-blog-controls-error',String(error&&error.message||error));
    console.error('[html-server] Unable to mount page controls',error);
  }
  function closeFolderBrowser(){ if (folderModal) folderModal.hidden = true; body.classList.remove('html-server-blog-related-open'); }
  function folderEntry(kind, name, meta){
    var entry = document.createElement(kind === 'folder' ? 'button' : 'a');
    entry.className = 'html-server-blog-folder-browser-entry directory-entry is-' + kind;
    if (kind === 'folder') { entry.type = 'button'; entry.setAttribute('data-folder-path', meta.path); }
    else entry.href = meta.href;
    var hooks=currentLayoutHooks(),customIcon=hooks&&typeof hooks.createFolderIcon==='function'?hooks.createFolderIcon({kind:kind}):null,icon=customIcon||document.createElement('span');if(!customIcon)icon.textContent=kind==='folder'?'D':'A';icon.classList.add('html-server-blog-folder-browser-icon','entry-mark');icon.setAttribute('aria-hidden','true');
    var title = document.createElement('strong'); title.textContent = name;
    var detail = document.createElement('small'); detail.textContent = kind === 'folder' ? meta.count + ' articles including descendants' : 'Article';
    entry.append(icon, title, detail); return entry;
  }
  async function renderFolderBrowser(folder){
    activeFolder = folder || ''; var request=++folderRequest;
    folderBrowser.classList.toggle(folderLoadingClass,!!liveDataUrl&&!liveFolderCache.has(activeFolder));
    var nextBreadcrumb=document.createDocumentFragment(),nextFolderBrowser=document.createDocumentFragment();
    var parts = activeFolder.split('/').filter(Boolean), folders = new Map(), files = [];
    var root = document.createElement('button'); root.type = 'button'; root.textContent = 'Home'; root.setAttribute('data-folder-path', ''); nextBreadcrumb.append(root);
    parts.forEach(function(part, index){
      var separator = document.createElement('span'); separator.textContent = '/'; nextBreadcrumb.append(separator);
      var button = document.createElement('button'); button.type = 'button'; button.textContent = part;
      button.setAttribute('data-folder-path', parts.slice(0, index + 1).join('/')); nextBreadcrumb.append(button);
    });
    var prefix = activeFolder ? activeFolder + '/' : '';
    if(liveDataUrl){
      try{var payload=liveFolderCache.get(activeFolder);if(!payload){var response=await fetch(liveDataUrl+'?'+new URLSearchParams({kind:'folder',folder:activeFolder}));if(response.ok){payload=await response.json();liveFolderCache.set(activeFolder,payload);}}if(request!==folderRequest)return;(payload?.folders||[]).forEach(function(item){folders.set(item.name,{path:item.path,count:item.count});});files=payload?.articles||[];}
      catch(error){}
    }else folderIndex.forEach(function(article){
      if (article.folder === activeFolder) { files.push(article); return; }
      if (!article.folder.startsWith(prefix)) return;
      var child = article.folder.slice(prefix.length).split('/')[0]; if (!child) return;
      var value = folders.get(child) || {path: prefix + child, count: 0}; value.count++; folders.set(child, value);
    });
    function groupLabel(text){ var label = document.createElement('div'); label.className = 'html-server-blog-folder-browser-label'; label.textContent = text; nextFolderBrowser.append(label); }
    if (folders.size) groupLabel('Folders');
    [...folders.entries()].sort(function(a,b){return a[0].localeCompare(b[0]);}).forEach(function(item){ nextFolderBrowser.append(folderEntry('folder', item[0], item[1])); });
    if (files.length) groupLabel('Articles');
    files.sort(function(a,b){return a.title.localeCompare(b.title);}).forEach(function(article){ nextFolderBrowser.append(folderEntry('article', article.title, article)); });
    document.querySelector('[data-blog-folder-title]').textContent = parts[parts.length - 1] || 'Vault root';
    document.querySelector('[data-blog-folder-count]').textContent = folders.size + ' folders · ' + files.length + ' articles';
    if (!folders.size && !files.length) { var empty = document.createElement('p'); empty.className = 'html-server-blog-muted'; empty.textContent = 'This folder has no published articles.'; nextFolderBrowser.append(empty); }
    folderBreadcrumb.replaceChildren(nextBreadcrumb);folderBrowser.replaceChildren(nextFolderBrowser);
    folderBrowser.classList.remove(folderLoadingClass);
    if(liveDataUrl)folders.forEach(function(meta){if(!liveFolderCache.has(meta.path))fetch(liveDataUrl+'?'+new URLSearchParams({kind:'folder',folder:meta.path})).then(function(response){return response.ok?response.json():null;}).then(function(value){if(value)liveFolderCache.set(meta.path,value);}).catch(function(){});});
  }
  function openFolderAt(folder){ closeRelated(); closeGlobalSearch(); folderModal.hidden = false; body.classList.add('html-server-blog-related-open'); renderFolderBrowser(folder||''); }
  function openFolderBrowser(){ openFolderAt(initialFolder); }
  document.querySelectorAll('[data-blog-folder-open]').forEach(function(button){ button.addEventListener('click', openFolderBrowser); });
  document.addEventListener('click',function(event){
    var crumb=event.target.closest&&event.target.closest('.html-server-blog-breadcrumb [data-blog-folder-path]');
    if(!crumb)return;
    event.preventDefault();event.stopPropagation();openFolderAt(crumb.getAttribute('data-blog-folder-path')||'');
  });
  document.querySelectorAll('[data-blog-folder-close]').forEach(function(button){ button.addEventListener('click', closeFolderBrowser); });
  if (folderBreadcrumb) folderBreadcrumb.addEventListener('click', function(event){ var button = event.target.closest('[data-folder-path]'); if (button) renderFolderBrowser(button.getAttribute('data-folder-path')); });
  if (folderBrowser) folderBrowser.addEventListener('click', function(event){
    var folder = event.target.closest('[data-folder-path]'); if (folder) { renderFolderBrowser(folder.getAttribute('data-folder-path')); return; }
    var link = event.target.closest('a'); if (link) closeFolderBrowser();
  });
  if(liveDataUrl){var preloadFolder=function(){if(!liveFolderCache.has(initialFolder))fetch(liveDataUrl+'?'+new URLSearchParams({kind:'folder',folder:initialFolder})).then(function(response){return response.ok?response.json():null;}).then(function(value){if(value)liveFolderCache.set(initialFolder,value);}).catch(function(){});};if('requestIdleCallback'in window)requestIdleCallback(preloadFolder,{timeout:1500});else setTimeout(preloadFolder,300);}
  function closeRelated(){ if (relatedModal) relatedModal.hidden = true; body.classList.remove('html-server-blog-related-open'); }
  var searchCloseTimer = 0;
  function usesSourceSearch(){ return body.dataset.blogSearchVariant === 'source'; }
  function usesLeezhiySearch(){ return body.dataset.blogLayout === 'leezhiy' && body.dataset.blogLayoutTheme === 'leezhiy-next'; }
  function finishGlobalSearchClose(){
    if (searchModal) { searchModal.hidden = true; searchModal.classList.remove('is-closing'); }
    if ((!relatedModal || relatedModal.hidden) && (!folderModal || folderModal.hidden)) body.classList.remove('html-server-blog-related-open');
    document.documentElement.scrollLeft=0;body.scrollLeft=0;
  }
  function closeGlobalSearch(){
    if(globalSearch)globalSearch.blur();
    if (!searchModal || searchModal.hidden) { finishGlobalSearchClose(); return; }
    clearTimeout(searchCloseTimer);
    if (usesSourceSearch()) {
      searchModal.classList.add('is-closing');
      searchCloseTimer = window.setTimeout(finishGlobalSearchClose, usesLeezhiySearch() ? 200 : 500);
    } else finishGlobalSearchClose();
  }
  function appendSearchHighlight(target, value, query){
    var text=String(value||''),terms=String(query||'').trim().toLowerCase().split(/\s+/).filter(Boolean),lower=text.toLowerCase(),cursor=0;
    while(cursor<text.length){
      var nextIndex=-1,nextTerm='';
      terms.forEach(function(term){var index=lower.indexOf(term,cursor);if(index>=0&&(nextIndex<0||index<nextIndex)){nextIndex=index;nextTerm=term;}});
      if(nextIndex<0){target.append(document.createTextNode(text.slice(cursor)));break;}
      if(nextIndex>cursor)target.append(document.createTextNode(text.slice(cursor,nextIndex)));
      var keyword=document.createElement(usesLeezhiySearch()?'b':usesSourceSearch()?'mark':'span');if(!usesSourceSearch()||usesLeezhiySearch())keyword.className='search-keyword';keyword.textContent=text.slice(nextIndex,nextIndex+nextTerm.length);target.append(keyword);cursor=nextIndex+nextTerm.length;
    }
  }
  function plainSearchContent(value){
    var tick=String.fromCharCode(96);
    return String(value||'').replace(/^---[\s\S]*?---\s*/,'').replace(new RegExp(tick+'{3}[\s\S]*?'+tick+'{3}','g'),' ').replace(new RegExp(tick+'([^'+tick+']+)'+tick,'g'),'$1').replace(/!\[([^\]]*)\]\([^)]*\)/g,'$1').replace(/\[([^\]]+)\]\([^)]*\)/g,'$1').replace(/<[^>]+>/g,' ').replace(/[#>*_~|=-]+/g,' ').replace(/\s+/g,' ').trim();
  }
  function algoliaExcerpt(article,query){
    var content=plainSearchContent(article.content||article.description||[article.folder,article.date].filter(Boolean).join(' · '));
    if(!content)return '';
    var terms=String(query||'').trim().toLowerCase().split(/\s+/).filter(Boolean),lower=content.toLowerCase(),first=-1;
    terms.forEach(function(term){var index=lower.indexOf(term);if(index>=0&&(first<0||index<first))first=index;});
    var start=first>30?first-30:0,end=start?first+120:140,prefix=start?'...':'',suffix=end<content.length?'...':'';
    return prefix+content.slice(start,end)+suffix;
  }
  function searchResult(article, query){
    if (usesLeezhiySearch()) {
      var localItem=document.createElement('li');
      var localTitle=document.createElement('a');localTitle.href=article.href;localTitle.className='search-result-title';appendSearchHighlight(localTitle,article.title,query);
      var localExcerptLink=document.createElement('a');localExcerptLink.href=article.href;
      var localExcerpt=document.createElement('p');localExcerpt.className='search-result';
      var localExcerptText=algoliaExcerpt(article,query).replace(/\.\.\.$/,'');appendSearchHighlight(localExcerpt,localExcerptText,query);localExcerpt.append(document.createTextNode('...'));
      localExcerptLink.append(localExcerpt);localItem.append(localTitle,localExcerptLink);return localItem;
    }
    if (usesSourceSearch()) {
      var item=document.createElement('li');item.className='ais-Hits-item';
      var sourceLink=document.createElement('a');sourceLink.href=article.href;sourceLink.className='algolia-hit-item-link';appendSearchHighlight(sourceLink,article.title,query);
      var excerpt=document.createElement('p');excerpt.className='algolia-hit-item-content';appendSearchHighlight(excerpt,algoliaExcerpt(article,query),query);
      item.append(sourceLink,excerpt);return item;
    }
    var link = document.createElement('a'); link.href = article.href; link.className = 'search-result';
    var title = document.createElement('strong'); title.textContent = article.title;
    var meta = document.createElement('small'); meta.textContent = article.folder + ' · ' + article.date;
    link.append(title, meta); return link;
  }
  var searchTimer = 0, searchRequest = 0, searchMatches = [], searchRendered = 0, searchPage = 0, searchDuration = 0;
  var searchBatchSize = 50;
  var algoliaPageSize = 5;
  function algoliaPagerIcon(kind){
    var paths={first:'M15.5 5 8.5 12l7 7M9.5 5l-7 7 7 7',previous:'m15 5-7 7 7 7',next:'m9 5 7 7-7 7',last:'m8.5 5 7 7-7 7M14.5 5l7 7-7 7'};
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="'+paths[kind]+'"/></svg>';
  }
  function renderAlgoliaPagination(){
    if(!searchPagination)return;searchPagination.replaceChildren();
    var pageCount=Math.min(5,Math.ceil(searchMatches.length/algoliaPageSize));if(pageCount<=1)return;
    var nav=document.createElement('nav');nav.className='ais-Pagination';nav.setAttribute('aria-label','搜索结果分页');
    var list=document.createElement('ul');list.className='ais-Pagination-list';
    function add(kind,label,page,disabled,selected){
      var item=document.createElement('li');item.className='ais-Pagination-item ais-Pagination-item--'+kind+(disabled?' ais-Pagination-item--disabled':'')+(selected?' ais-Pagination-item--selected':'');
      var link=document.createElement('a');link.className='ais-Pagination-link';link.href='#';link.setAttribute('aria-label',label);link.setAttribute('data-blog-search-page',String(page));link.innerHTML=/^(?:first|previous|next|last)$/.test(kind)?algoliaPagerIcon(kind):String(page+1);item.append(link);list.append(item);
    }
    add('first','第一页',0,searchPage===0,false);add('previous','上一页',Math.max(0,searchPage-1),searchPage===0,false);
    for(var page=0;page<pageCount;page++)add('page','第 '+(page+1)+' 页',page,false,page===searchPage);
    add('next','下一页',Math.min(pageCount-1,searchPage+1),searchPage===pageCount-1,false);add('last','最后一页',pageCount-1,searchPage===pageCount-1,false);
    nav.append(list);searchPagination.append(nav);
  }
  function appendSearchBatch(){
    var originalSearch=usesSourceSearch()&&!usesLeezhiySearch(),host=searchResults;
    if(usesLeezhiySearch()){var localList=searchResults.querySelector('.leezhiy-search-result-list');if(!localList){localList=document.createElement('ul');localList.className='search-result-list leezhiy-search-result-list';searchResults.append(localList);}host=localList;}
    if(originalSearch){searchResults.replaceChildren();searchRendered=searchPage*algoliaPageSize;}
    var end = usesLeezhiySearch() ? searchMatches.length : originalSearch ? Math.min(searchRendered+algoliaPageSize,searchMatches.length) : Math.min(searchRendered + searchBatchSize, searchMatches.length);
    var activeQuery=globalSearch.value.trim().toLowerCase();
    for (; searchRendered < end; searchRendered++) host.append(searchResult(searchMatches[searchRendered],activeQuery));
    var previous = searchResults.querySelector('[data-blog-search-more]'); if (previous) previous.remove();
    if (originalSearch) renderAlgoliaPagination();
    else if (!usesLeezhiySearch() && searchRendered < searchMatches.length) {
      var more = document.createElement('button'); more.type = 'button'; more.className = 'html-server-blog-search-more'; more.setAttribute('data-blog-search-more', '');
      more.textContent = 'Show more · ' + (searchMatches.length - searchRendered) + ' remaining'; searchResults.append(more);
    }
  }
  async function renderSearchResults(){
    var query = globalSearch.value.trim().toLowerCase(); searchResults.replaceChildren(); searchMatches = []; searchRendered = 0;searchPage=0;if(searchPagination)searchPagination.replaceChildren();
    if (!query) {
      if(searchCount)searchCount.textContent = usesSourceSearch() ? '' : 'Start typing to search all articles.';
      if(usesLeezhiySearch()){var idle=document.createElement('div');idle.id='no-result';idle.className='leezhiy-search-empty';idle.innerHTML='<i class="fa fa-search" aria-hidden="true"></i>';searchResults.append(idle);}
      if(searchLoading)searchLoading.hidden=true; return;
    }
    var request = ++searchRequest;
    var started=performance.now();if(searchLoading)searchLoading.hidden=false;
    if(searchCount)searchCount.textContent = usesSourceSearch() ? '' : 'Searching with Obsidian…';
    try {
      var searchEndpoint = window.__htmlServerStaticSearch ? staticSearchUrl : '/.obsidian/plugins/obsidian-http-server/blog-search.json';
      var response = await fetch(searchEndpoint + (searchEndpoint.indexOf('?') >= 0 ? '&' : '?') + 'q=' + encodeURIComponent(query));
      if (!response.ok) throw new Error('Search request failed');
      var payload = await response.json(); if (request !== searchRequest) return;
      var matches = Array.isArray(payload) ? payload : payload.articles || [];
      if (window.__htmlServerStaticSearch) {
        var rootUrl = new URL('../', new URL(searchEndpoint, location.href));
        var staticQuery = query.replace(/\b(?:tag|series|path):/g, '').replace(/[\[\]:]/g, ' ').replace(/\s+/g, ' ').trim();
        matches = matches.filter(function(article){
          var searchable = [article.title, article.path, article.folder, article.description, article.content, article.date, JSON.stringify(article.properties || {})].concat(article.tags || [], article.series || []).join(' ').toLowerCase();
          return staticQuery.split(' ').every(function(term){ return searchable.indexOf(term) >= 0; });
        }).map(function(article){
          article.href = new URL((article.href || articleRoute(article.path)).replace(/^[/]+/, '').replace(/[/]?index[.]html$/,'').replace(/.md[/]?$/i,'/').replace(/[/]?$/,'/'), rootUrl).href;
          return article;
        });
      }
      searchMatches = matches;
      searchDuration=Math.max(0,Math.round(performance.now()-started));if(searchLoading)searchLoading.hidden=true;
      if(searchCount)searchCount.textContent = usesLeezhiySearch() ? '' : usesSourceSearch() ? '找到 '+matches.length+' 条结果，用时 '+searchDuration+' 毫秒' : matches.length + ' matching articles' + (matches.length > searchBatchSize ? ' · loading as you scroll' : '');
      if(usesLeezhiySearch()&&!matches.length){var localEmpty=document.createElement('div');localEmpty.id='no-result';localEmpty.className='leezhiy-search-empty';localEmpty.innerHTML='<i class="far fa-frown" aria-hidden="true"></i>';searchResults.append(localEmpty);}
      else if(usesSourceSearch()&&!matches.length){var empty=document.createElement('div');empty.className='ais-Hits-empty';empty.textContent='找不到您查询的内容：'+query;searchResults.append(empty);renderAlgoliaPagination();}else appendSearchBatch();
    } catch (error) {
      if(searchLoading)searchLoading.hidden=true;if (request === searchRequest && searchCount) searchCount.textContent = usesSourceSearch() ? '搜索失败' : 'Search failed. Please try again.';
    }
  }
  function openGlobalSearch(){
    closeRelated(); clearTimeout(searchCloseTimer); searchModal.classList.remove('is-closing'); searchModal.hidden = false; body.classList.add('html-server-blog-related-open');
    globalSearch.focus({preventScroll:true}); globalSearch.select();
    var appScroller=document.querySelector('.html-server-blog-app');if(appScroller)appScroller.scrollLeft=0;
    requestAnimationFrame(function(){if(appScroller)appScroller.scrollLeft=0;document.documentElement.scrollLeft=0;body.scrollLeft=0;});
    renderSearchResults();
  }
  document.addEventListener('click',function(event){
    if(event.target.closest&&event.target.closest('[data-blog-search-open]')){event.preventDefault();openGlobalSearch();return;}
    if(event.target.closest&&event.target.closest('[data-blog-search-close]')){event.preventDefault();closeGlobalSearch();}
  });
  if (searchForm) searchForm.addEventListener('submit',function(event){event.preventDefault();renderSearchResults();});
  if (globalSearch) globalSearch.addEventListener('input', function(){
    if(usesLeezhiySearch()){renderSearchResults();return;}
    if(usesSourceSearch()){if(!globalSearch.value.trim())renderSearchResults();return;}
    if (searchTimer) clearTimeout(searchTimer);
    searchTimer = setTimeout(renderSearchResults, 250);
  });
  if (searchResults) searchResults.addEventListener('click', function(event){
    var more = event.target.closest('[data-blog-search-more]'); if (more) { appendSearchBatch(); return; }
    var link = event.target.closest('a'); if (!link) return; closeGlobalSearch();
    if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) { event.preventDefault(); loadBlogPage(link.href, true); }
  });
  if (searchResults) searchResults.addEventListener('scroll', function(){
    if (!usesSourceSearch() && searchRendered < searchMatches.length && searchResults.scrollTop + searchResults.clientHeight >= searchResults.scrollHeight - 160) appendSearchBatch();
  }, { passive: true });
  if(searchPagination)searchPagination.addEventListener('click',function(event){var link=event.target.closest&&event.target.closest('[data-blog-search-page]');if(!link)return;event.preventDefault();var page=Number(link.getAttribute('data-blog-search-page'));if(!Number.isFinite(page)||page===searchPage)return;searchPage=page;appendSearchBatch();var hits=document.querySelector('#algolia-hits>div');if(hits)hits.scrollTop=0;});
  document.addEventListener('click', function(event){
      var button = event.target.closest && event.target.closest('[data-blog-related]'); if (!button) return;
      var kind = button.getAttribute('data-blog-related');
      var value = button.getAttribute('data-blog-value');
      if (kind === 'series') {
        var seriesRoute='series/'+encodeURIComponent(encodeURIComponent(value))+(staticMetaUrl?'/':'');
        if(staticMetaUrl)hardNavigate(siteUrl(seriesRoute),false);else loadBlogPage('/'+seriesRoute,true);return;
      }
      var key = kind === 'tag' ? 'tags' : 'series';
      var refMap=kind==='tag'?staticTagArticleRefs:staticSerieArticleRefs,indexedIds=refMap.get(value.toLowerCase());
      var matches = indexedIds ? indexedIds.map(function(id){return articleIndex[id];}).filter(Boolean) : articleIndex.filter(function(article){
        return article[key].some(function(item){ return item.toLowerCase() === value.toLowerCase(); });
      });
      if(liveDataUrl){
        fetch(liveDataUrl+'?'+new URLSearchParams({kind:'related',taxonomy:key,value:value,page:'1',size:'100'})).then(function(response){return response.ok?response.json():Promise.reject();}).then(function(payload){mountRelated(payload.items||[],payload.total||0);}).catch(function(){});return;
      }
      mountRelated(matches,matches.length);
      function mountRelated(items,total){
      document.querySelector('[data-blog-related-kind]').textContent = kind === 'tag' ? 'TAG' : 'SERIES';
      document.querySelector('[data-blog-related-title]').textContent = (kind === 'tag' ? '#' : '') + value;
      document.querySelector('[data-blog-related-count]').textContent = total + ' related articles';
      relatedList.replaceChildren();
      items.forEach(function(article){
        var link = document.createElement('a'); link.href = article.href;
        var title = document.createElement('strong'); title.textContent = article.title;
        var meta = document.createElement('span'); meta.textContent = article.folder + ' · ' + article.date;
        link.append(title, meta); relatedList.append(link);
      });
      relatedModal.hidden = false; body.classList.add('html-server-blog-related-open');
      }
  });
  document.querySelectorAll('[data-blog-related-close]').forEach(function(button){ button.addEventListener('click', closeRelated); });
  if (relatedList) relatedList.addEventListener('click', function(event){
    var link = event.target.closest('a');
    if (!link) return;
    closeRelated();
    if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      event.preventDefault();
      loadBlogPage(link.href, true);
    }
  });
  var pageRequest = 0;
  async function executePageScripts(container, targetUrl){
    var scripts=Array.from(container.querySelectorAll('script'));
    for(var index=0;index<scripts.length;index++){
      var oldScript=scripts[index],script=document.createElement('script'),source=oldScript.getAttribute('src'),settled=null;
      Array.from(oldScript.attributes).forEach(function(attribute){
        script.setAttribute(attribute.name, attribute.name === 'src' ? new URL(attribute.value, targetUrl).href : attribute.value);
      });
      script.textContent=oldScript.textContent;
      if(source)settled=new Promise(function(resolve,reject){script.addEventListener('load',resolve,{once:true});script.addEventListener('error',function(){reject(new Error('Page script failed to load: '+script.src));},{once:true});});
      oldScript.replaceWith(script);
      if(settled)await settled;
    }
  }
  async function loadBlogPage(href, push){
    var target=new URL(href,location.href),routePath=target.pathname.replace(/[/]index[.]html$/,'').replace(/[/]+$/,'');
    var currentCourse=!!document.querySelector('[data-blog-course]');
    var entersCourse=!currentCourse&&/[/]series[/][^/]+$/.test(routePath),leavesCourse=currentCourse&&/[/]series$/.test(routePath);
    // Course pages own a different persistent frame. Decide that boundary
    // before fetching so an intentional full reload performs one request, not
    // a discarded soft-navigation request followed by a second document load.
    if(target.origin===location.origin&&(entersCourse||leavesCourse)){hardNavigate(target.href,false);return;}
    var currentMain=document.querySelector('[data-blog-main]');if(!currentMain){hardNavigate(href,false);return;}
    var layoutHooks=window.HtmlServerBlog&&window.HtmlServerBlog.getLayoutHooks(),navigationHandle=layoutHooks&&typeof layoutHooks.beginSoftNavigation==='function'?layoutHooks.beginSoftNavigation({href:href,push:push}):null,progressToken=navigationHandle?0:beginPageProgress();
    var request=++pageRequest,committed=false,scriptsReady=false;
    currentMain.classList.add(mainLoadingClass);
    try {
      var contentUrl=target,response=await fetch(target.href,{credentials:'same-origin'}),requestedStatus=response.status;
      if(!response.ok&&staticMetaUrl){contentUrl=staticNotFoundUrl(target);response=await fetch(contentUrl.href,{credentials:'same-origin'});}
      var parsed=new DOMParser().parseFromString(await response.text(),'text/html');
      var incoming=parsed.querySelector('[data-blog-main]');
      if(!incoming&&staticMetaUrl&&contentUrl.href===target.href){contentUrl=staticNotFoundUrl(target);response=await fetch(contentUrl.href,{credentials:'same-origin'});parsed=new DOMParser().parseFromString(await response.text(),'text/html');incoming=parsed.querySelector('[data-blog-main]');requestedStatus=404;}
      if (!incoming) throw new Error('Page response has no blog content'); if(request !== pageRequest) return;
      // Only a real series-tree changes the persistent shell structure. Some
      // layouts (for example Leezhiy) keep series articles in the ordinary
      // article sidebar while marking their series context for metadata. A
      // marker-only transition must stay inside the common main-pane swap so
      // shell-owned features such as the global music player keep one DOM and
      // media instance, exactly like the source PJAX boundary.
      currentCourse=!!document.querySelector('[data-blog-course]');var incomingCourse=!!parsed.querySelector('[data-blog-course]');
      var recoveryPage=!!incoming.querySelector('.html-server-blog-not-found,.html-server-blog-publish-error');
      // A missing/error note is article content, not a new site frame. Keep a
      // tutorial's directory tree and replace only its main pane; ordinary
      // course/non-course navigation still falls back to a full frame load.
      if (currentCourse !== incomingCourse&&contentUrl.href===target.href&&!recoveryPage) { if(request===pageRequest)hardNavigate(href,false); return; }
      document.dispatchEvent(new CustomEvent('html-server:before-page-unmount',{detail:{href:href,status:requestedStatus}}));
      var replacement=await preparePageMain(incoming,contentUrl);if(request!==pageRequest)return;
      var incomingPageState=parsed.body&&parsed.body.dataset?{page:parsed.body.dataset.page||'',blogPageKind:parsed.body.dataset.blogPageKind||''}:null;
      await commitPageMain(currentMain,replacement,incomingPageState);
      committed=true;
      // A selected layout may declare a persistent shell subtree that follows
      // page data while the common main-content swap remains unchanged.
      var stickySwapSelector=body.dataset.blogStickySwapSelector;
      if(stickySwapSelector){
        var currentSticky=document.querySelector(stickySwapSelector),incomingSticky=parsed.querySelector(stickySwapSelector);
        if(currentSticky&&incomingSticky){
          var stickyReplacement=document.importNode(incomingSticky,true);
          stickyReplacement.querySelectorAll('[href],[src]').forEach(function(element){
            ['href','src'].forEach(function(attribute){var value=element.getAttribute(attribute);if(!value||value[0]==='#'||/^(?:data:|blob:|mailto:|tel:|javascript:)/i.test(value))return;try{element.setAttribute(attribute,new URL(value,contentUrl).href);}catch(error){}});
          });
          currentSticky.replaceWith(stickyReplacement);
        }
      }
      await executePageScripts(replacement,contentUrl);if(request!==pageRequest)return;scriptsReady=true;
      var replacementMissingPath=replacement.querySelector('[data-blog-not-found-path]');if(replacementMissingPath)replacementMissingPath.textContent=contentUrl.searchParams.get('path')||target.pathname;
      if (push) history.pushState({htmlServerPage:true},'',target.pathname+target.search+target.hash);
      syncLayoutNavigation();
      document.title=parsed.title;
      document.querySelectorAll('.html-server-blog-navigation a').forEach(function(link){
        new URL(link.href,location.href).pathname===target.pathname?link.setAttribute('aria-current','page'):link.removeAttribute('aria-current');
      });
      document.dispatchEvent(new CustomEvent('html-server:after-page-mount',{detail:{href:target.href,main:replacement}}));
      if(layoutHooks&&typeof layoutHooks.afterSoftNavigation==='function')layoutHooks.afterSoftNavigation({href:target.href,main:replacement});
      await mountPageDataControls();if(body.getAttribute('data-blog-controls-state')!=='failed')body.setAttribute('data-blog-controls-state','mounted');
      if(target.hash){requestAnimationFrame(function(){var anchor=replacement.querySelector(target.hash);anchor?anchor.scrollIntoView({block:'start'}):scrollPageTop();});}
      else scrollPageTop();
    } catch(error) { console.error('[html-server] Soft navigation failed',error);if(request===pageRequest&&(!committed||!scriptsReady)) hardNavigate(href,false); }
    finally { var main=document.querySelector('[data-blog-main]'); if(main) main.classList.remove(mainLoadingClass);if(layoutHooks&&typeof layoutHooks.endSoftNavigation==='function')layoutHooks.endSoftNavigation({handle:navigationHandle});else finishPageProgress(progressToken); }
  }
  function layoutPageServices(){return {openFolderAt:openFolderAt,siteUrl:siteUrl,beginPageProgress:beginPageProgress,hardNavigate:hardNavigate,loadBlogPage:loadBlogPage,closeRelated:closeRelated,closeGlobalSearch:closeGlobalSearch,closeFolderBrowser:closeFolderBrowser,hasStaticMetadata:!!staticMetaUrl};}
  document.addEventListener('click',function(event){var hooks=window.HtmlServerBlog&&window.HtmlServerBlog.getLayoutHooks();if(hooks&&typeof hooks.handlePageClick==='function')hooks.handlePageClick(event,layoutPageServices());});
  document.addEventListener('keydown',function(event){var hooks=window.HtmlServerBlog&&window.HtmlServerBlog.getLayoutHooks();if(hooks&&typeof hooks.handlePageKeydown==='function')hooks.handlePageKeydown(event,layoutPageServices());});
  function normalizeOutlineText(value){return String(value||'').trim().toLocaleLowerCase().replace(/\s+/g,' ');}
  function outlineLinkKeys(link){
    var raw=(link.getAttribute('href')||'').replace(/^[^#]*#/,'');if(!raw)return null;
    var decoded=raw;try{decoded=decodeURIComponent(raw);}catch(error){}
    return {raw:raw,decoded:decoded,expected:normalizeOutlineText(decoded),legacyExpected:normalizeOutlineText(decoded.replace(/-/g,' '))};
  }
  var outlineTargetCache=new WeakMap(),outlineCache=null,outlineRebuildPending=false,outlineRebuildFrame=0;
  function appendOutlineCandidate(index,key,heading){if(!key)return;var matches=index.get(key);if(!matches){matches=[];index.set(key,matches);}if(matches.indexOf(heading)<0)matches.push(heading);}
  function indexOutlineTargets(links){
    outlineTargetCache=new WeakMap();
    var headings=Array.from(document.querySelectorAll('[data-blog-main] h1,[data-blog-main] h2,[data-blog-main] h3,[data-blog-main] h4,[data-blog-main] h5,[data-blog-main] h6')),exact=new Map(),legacy=new Map(),occurrences=new Map();
    headings.forEach(function(heading){var label=normalizeOutlineText(heading.getAttribute('data-heading')||heading.textContent),headingId=normalizeOutlineText(heading.id);appendOutlineCandidate(exact,label,heading);appendOutlineCandidate(exact,headingId,heading);appendOutlineCandidate(legacy,label,heading);});
    links.forEach(function(link){
      var keys=outlineLinkKeys(link);if(!keys){outlineTargetCache.set(link,null);return;}
      var occurrence=occurrences.get(keys.expected)||0;occurrences.set(keys.expected,occurrence+1);
      var target=document.getElementById(keys.decoded)||document.getElementById(keys.raw),matches;
      if(!target){matches=exact.get(keys.expected)||[];if(matches.length)target=matches[Math.min(occurrence,matches.length-1)];}
      if(!target){matches=legacy.get(keys.legacyExpected)||[];if(matches.length)target=matches[Math.min(occurrence,matches.length-1)];}
      outlineTargetCache.set(link,target||null);
    });
  }
  function findOutlineTarget(link){
    if(outlineTargetCache.has(link)){var cached=outlineTargetCache.get(link);if(!cached||cached.isConnected)return cached;}
    var keys=outlineLinkKeys(link);if(!keys)return null;
    var direct=document.getElementById(keys.decoded)||document.getElementById(keys.raw);if(direct)return direct;
    var occurrence=0,outlineLinks=Array.from(document.querySelectorAll('[data-blog-outline-link]'));
    for(var linkIndex=0;linkIndex<outlineLinks.length&&outlineLinks[linkIndex]!==link;linkIndex++){var previousKeys=outlineLinkKeys(outlineLinks[linkIndex]);if(previousKeys&&previousKeys.expected===keys.expected)occurrence++;}
    var headings=Array.from(document.querySelectorAll('[data-blog-main] h1,[data-blog-main] h2,[data-blog-main] h3,[data-blog-main] h4,[data-blog-main] h5,[data-blog-main] h6'));
    var exact=headings.filter(function(heading){var label=normalizeOutlineText(heading.getAttribute('data-heading')||heading.textContent),headingId=normalizeOutlineText(heading.id);return label===keys.expected||headingId===keys.expected;});
    if(exact.length)return exact[Math.min(occurrence,exact.length-1)];
    var legacy=headings.filter(function(heading){return normalizeOutlineText(heading.getAttribute('data-heading')||heading.textContent)===keys.legacyExpected;});
    if(legacy.length)return legacy[Math.min(occurrence,legacy.length-1)];
    return null;
  }
  function outlineScrollContainer(target){
    var node=target.parentElement;
    while(node){
      var style=getComputedStyle(node),overflowY=style.overflowY;
      var viewportHeight=node===document.body||node===document.documentElement?window.innerHeight:node.clientHeight;
      if((overflowY==='auto'||overflowY==='scroll')&&node.scrollHeight>viewportHeight+1)return node;
      if(node===document.body||node===document.documentElement)break;
      node=node.parentElement;
    }
    return document.scrollingElement||document.documentElement;
  }
  var outlineFrame=0,outlineNavigationUntil=0,outlineMedia=matchMedia('(max-width:900px)');
  var outlineShellSelector=body.dataset.blogOutlineShellSelector||'';
  function outlineShell(node){return node&&outlineShellSelector?node.closest(outlineShellSelector):null;}
  function setMobileOutline(toggle,open){var nav=toggle&&toggle.closest('[data-blog-outline]');if(!toggle||!nav)return;toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-mobile-open',open);if(open){var shell=outlineShell(nav);if(shell)shell.classList.remove('is-mobile-scrolled-away');}}
  function syncMobileOutlines(){document.querySelectorAll('[data-blog-outline-toggle]').forEach(function(toggle){setMobileOutline(toggle,!outlineMedia.matches);});}
  syncMobileOutlines();
  if(outlineMedia.addEventListener)outlineMedia.addEventListener('change',syncMobileOutlines);else if(outlineMedia.addListener)outlineMedia.addListener(syncMobileOutlines);
  document.addEventListener('click',function(event){var toggle=event.target.closest&&event.target.closest('[data-blog-outline-toggle]');if(!toggle)return;var nav=toggle.closest('[data-blog-outline]');setMobileOutline(toggle,!(nav&&nav.classList.contains('is-mobile-open')));});
  function mountLayoutMobileOutlineVisibility(){
    if(body.dataset.blogOutlineAutoHide!=='true'||!outlineShellSelector)return;
    var media=matchMedia('(max-width:900px)'),lastTop=0,ticking=false,reachedStickyTop=false;
    function top(){return Math.max(window.scrollY||0,document.documentElement.scrollTop||0,body.scrollTop||0,scrollRoot&&scrollRoot.scrollTop||0);}
    function sync(){
      ticking=false;var shell=document.querySelector(outlineShellSelector),nav=shell&&shell.querySelector('[data-blog-outline]'),toggle=nav&&nav.querySelector('[data-blog-outline-toggle]'),current=top();
      if(!shell)return;
      if(!media.matches){shell.classList.remove('is-mobile-scrolled-away');reachedStickyTop=false;lastTop=current;return;}
      if(nav&&nav.classList.contains('is-mobile-open')){shell.classList.remove('is-mobile-scrolled-away');lastTop=current;return;}
      if(Date.now()<outlineNavigationUntil){shell.classList.remove('is-mobile-scrolled-away');lastTop=current;return;}
      var stickyTop=2+(parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-top'))||0),rect=shell.getBoundingClientRect();
      if(current<=8||(!shell.classList.contains('is-mobile-scrolled-away')&&rect.top>stickyTop+8)){reachedStickyTop=false;shell.classList.remove('is-mobile-scrolled-away');lastTop=current;return;}
      if(!reachedStickyTop){if(rect.top<=stickyTop+2)reachedStickyTop=true;shell.classList.remove('is-mobile-scrolled-away');lastTop=current;return;}
      if(current<lastTop-2){shell.classList.remove('is-mobile-scrolled-away');setMobileOutline(toggle,false);}
      else if(current>lastTop+2)shell.classList.add('is-mobile-scrolled-away');
      lastTop=current;
    }
    function schedule(){if(!ticking){ticking=true;requestAnimationFrame(sync);}}
    document.addEventListener('scroll',schedule,true);window.addEventListener('resize',schedule,{passive:true});media.addEventListener&&media.addEventListener('change',schedule);
    document.addEventListener('html-server:after-page-mount',function(){lastTop=top();reachedStickyTop=false;var shell=document.querySelector(outlineShellSelector);if(shell)shell.classList.remove('is-mobile-scrolled-away');schedule();});
    lastTop=top();sync();
  }
  mountLayoutMobileOutlineVisibility();
  function stickyHeaderOffset(viewportTop){
    var header=document.querySelector(body.dataset.blogStickyHeaderSelector||'.html-server-blog-site-header');if(!header)return 0;
    var style=getComputedStyle(header),rect=header.getBoundingClientRect();return (style.position==='fixed'||style.position==='sticky')&&rect.top<=viewportTop+1&&rect.bottom>viewportTop?rect.height:0;
  }
  function mobileOutlineOffset(viewportTop,forceVisible){
    if(!outlineMedia.matches)return 0;
    var shell=outlineShellSelector&&document.querySelector(outlineShellSelector),nav=shell&&shell.querySelector('[data-blog-outline]'),toggle=nav&&nav.querySelector('[data-blog-outline-toggle]');if(!shell||!toggle)return 0;
    var hidden=shell.classList.contains('is-mobile-scrolled-away')&&!(nav&&nav.classList.contains('is-mobile-open')),rect=shell.getBoundingClientRect();
    return (forceVisible||(!hidden&&rect.top<=viewportTop+4&&rect.bottom>viewportTop))?toggle.getBoundingClientRect().height:0;
  }
  function syncLayoutOutlineState(links,activeLink){
    var hooks=window.HtmlServerBlog&&window.HtmlServerBlog.getLayoutHooks();if(hooks&&typeof hooks.syncOutlineState==='function')hooks.syncOutlineState(links,activeLink);
  }
  function updateLayoutOutlineProgress(article,viewportTop,viewportHeight){
    var hooks=window.HtmlServerBlog&&window.HtmlServerBlog.getLayoutHooks();if(hooks&&typeof hooks.updateOutlineProgress==='function')hooks.updateOutlineProgress(article,viewportTop,viewportHeight);
  }
  var activeOutlineLink=null,outlineResizeObserver=null;
  function revealActiveOutlineLink(link){
    if(!link||outlineMedia.matches||activeOutlineLink===link)return;activeOutlineLink=link;
    var box=link.parentElement;
    while(box&&box!==scrollRoot&&box!==body&&box!==document.documentElement){var style=getComputedStyle(box);if((style.overflowY==='auto'||style.overflowY==='scroll')&&box.scrollHeight>box.clientHeight+1)break;box=box.parentElement;}
    if(!box||box===scrollRoot||box===body||box===document.documentElement)return;
    var boxRect=box.getBoundingClientRect(),linkRect=link.getBoundingClientRect(),edge=12,next=box.scrollTop;
    if(linkRect.top<boxRect.top+edge)next-=boxRect.top+edge-linkRect.top;
    else if(linkRect.bottom>boxRect.bottom-edge)next+=linkRect.bottom-(boxRect.bottom-edge);
    next=Math.min(Math.max(0,box.scrollHeight-box.clientHeight),Math.max(0,next));if(Math.abs(next-box.scrollTop)>.5)box.scrollTop=next;
  }
  function rebuildOutlineCache(){
    var links=Array.from(document.querySelectorAll('[data-blog-outline-link]'));indexOutlineTargets(links),entryByLink=new WeakMap();
    var entries=links.map(function(link){var target=outlineTargetCache.get(link),entry=target?{link:link,target:target,top:0}:null;if(entry)entryByLink.set(link,entry);return entry;}).filter(function(entry){return !!entry&&entry.target.getClientRects().length>0;});if(!entries.length){outlineCache={links:links,entries:[],entryByLink:entryByLink,root:null,rootIsViewport:false,article:null,selectedLink:null};return outlineCache;}
    var root=outlineScrollContainer(entries[0].target),rootIsViewport=root===document.documentElement||root===document.scrollingElement,rootRect=rootIsViewport?null:root.getBoundingClientRect(),viewportTop=rootIsViewport?0:rootRect.top,scrollTop=root.scrollTop;
    entries.forEach(function(entry){entry.top=entry.target.getBoundingClientRect().top+(rootIsViewport?scrollTop:scrollTop-rootRect.top);});
    var article=entries[0].target.closest('.html-server-blog-article')||document.querySelector('.html-server-blog-article');
    outlineCache={links:links,entries:entries,entryByLink:entryByLink,root:root,rootIsViewport:rootIsViewport,article:article,selectedLink:null};activeOutlineLink=null;return outlineCache;
  }
  function scheduleOutlineCacheRebuild(){
    if(outlineRebuildPending)return;outlineRebuildPending=true;
    outlineRebuildFrame=requestAnimationFrame(function(){outlineRebuildFrame=0;outlineRebuildPending=false;rebuildOutlineCache();scheduleActiveOutline();});
  }
  function invalidateOutlineCache(){if(outlineRebuildFrame){cancelAnimationFrame(outlineRebuildFrame);outlineRebuildFrame=0;}outlineRebuildPending=false;outlineCache=null;outlineTargetCache=new WeakMap();activeOutlineLink=null;}
  function currentOutlineCache(){
    if(outlineRebuildPending){if(outlineRebuildFrame)cancelAnimationFrame(outlineRebuildFrame);outlineRebuildFrame=0;outlineRebuildPending=false;return rebuildOutlineCache();}
    var cache=outlineCache;if(!cache)return rebuildOutlineCache();
    if(cache.root&&!cache.root.isConnected)return rebuildOutlineCache();
    return cache;
  }
  function observeOutlineArticle(){
    if(outlineResizeObserver){outlineResizeObserver.disconnect();outlineResizeObserver=null;}
    if(!window.ResizeObserver)return;var article=document.querySelector('.html-server-blog-article');if(!article)return;
    outlineResizeObserver=new ResizeObserver(function(){scheduleOutlineCacheRebuild();});outlineResizeObserver.observe(article);
  }
  function outlineEntryAt(entries,top){var active=entries[0];entries.forEach(function(entry){if(entry.top<=top)active=entry;});return active;}
  function setActiveOutlineEntry(cache,entry,preferredLink){
    if(!cache||!entry)return;var link=preferredLink||entry.link;if(!link)return;
    cache.links.forEach(function(item){item===link?item.setAttribute('aria-current','location'):item.removeAttribute('aria-current');});cache.selectedLink=link;revealActiveOutlineLink(link);syncLayoutOutlineState(cache.links,link);
  }
  function updateActiveOutline(){
    outlineFrame=0;
    var cache=currentOutlineCache();if(!cache.entries.length||!cache.root)return;
    var root=cache.root,rootIsViewport=cache.rootIsViewport,rootRect=rootIsViewport?null:root.getBoundingClientRect(),viewportTop=rootIsViewport?0:rootRect.top,viewportHeight=rootIsViewport?window.innerHeight:root.clientHeight,headerOffset=stickyHeaderOffset(viewportTop),outlineOffset=mobileOutlineOffset(viewportTop,false),thresholdOffset=headerOffset+outlineOffset+(outlineMedia.matches?24:Math.min(120,Math.max(42,viewportHeight*.18))),scrollTop=root.scrollTop,scrollHeight=root.scrollHeight,active=outlineEntryAt(cache.entries,scrollTop+thresholdOffset);
    updateLayoutOutlineProgress(cache.article,viewportTop,viewportHeight);
    if(scrollTop+viewportHeight>=scrollHeight-2)active=cache.entries[cache.entries.length-1];setActiveOutlineEntry(cache,active,null);
  }
  function scheduleActiveOutline(){if(!outlineFrame)outlineFrame=requestAnimationFrame(updateActiveOutline);}
  document.addEventListener('scroll',scheduleActiveOutline,true);window.addEventListener('resize',function(){scheduleOutlineCacheRebuild();scheduleActiveOutline();},{passive:true});document.addEventListener('html-server:after-page-mount',function(){invalidateOutlineCache();observeOutlineArticle();scheduleActiveOutline();});
  observeOutlineArticle();
  document.addEventListener('click',function(event){
    var link=event.target.closest&&event.target.closest('[data-blog-outline-link]');if(!link||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    event.preventDefault();event.stopImmediatePropagation();
    var target=findOutlineTarget(link);if(!target)return;
    var mobileOutline=link.closest('[data-blog-outline]'),mobileToggle=mobileOutline&&mobileOutline.querySelector('[data-blog-outline-toggle]');if(outlineMedia.matches){outlineNavigationUntil=Date.now()+900;var mobileShell=outlineShell(mobileOutline);if(mobileShell)mobileShell.classList.remove('is-mobile-scrolled-away');setMobileOutline(mobileToggle,false);}
    var root=outlineScrollContainer(target),rootIsViewport=root===document.documentElement||root===document.scrollingElement,rootRect=rootIsViewport?null:root.getBoundingClientRect(),viewportTop=rootIsViewport?0:rootRect.top,offset=stickyHeaderOffset(viewportTop)+mobileOutlineOffset(viewportTop,true),targetRect=target.getBoundingClientRect(),top;
    if(rootIsViewport){
      top=targetRect.top+window.scrollY-offset-24;window.scrollTo({top:Math.max(0,top),behavior:'smooth'});
    }else{
      top=targetRect.top-rootRect.top+root.scrollTop-offset-24;root.scrollTo({top:Math.max(0,top),behavior:'smooth'});
    }
    var cache=currentOutlineCache(),entry=cache.entryByLink.get(link);if(entry)setActiveOutlineEntry(cache,entry,link);else{cache.links.forEach(function(item){item===link?item.setAttribute('aria-current','location'):item.removeAttribute('aria-current');});revealActiveOutlineLink(link);syncLayoutOutlineState(cache.links,link);}
    var nextHash=target.id||(link.getAttribute('href')||'').replace(/^[^#]*#/,'');history.replaceState(history.state,'',location.pathname+location.search+'#'+nextHash);
  });
  scheduleActiveOutline();
  document.addEventListener('click',function(event){
    if(document.body.dataset.blogNavigationControl==='external')return;
    var link=event.target.closest&&event.target.closest('[data-blog-main] a, .html-server-blog-primary-navigation a, .html-server-blog-site-brand, .html-server-blog-navigation a, [data-blog-overview] a, [data-blog-folder-browser] a');
    if(!link||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||link.hasAttribute('download')||link.target) return;
    var target=new URL(link.href,location.href),seriesTree=document.querySelector('[data-blog-course]'),sameDocument=target.pathname===location.pathname&&target.search===location.search;
    if(target.origin!==location.origin||(target.searchParams.get('series')&&seriesTree))return;
    // Returning without preventDefault here reloads the current document when
    // an already-active navigation item (notably Home on Home) is clicked. A
    // source-PJAX site keeps the shell and its audio instance alive for this
    // no-op navigation. Preserve native same-document hash navigation, but
    // consume a hashless repeat click and only restore the page scroll origin.
    if(sameDocument){if(target.hash)return;event.preventDefault();closeMenu();closeRelated();closeGlobalSearch();closeFolderBrowser();if(location.hash)history.replaceState(history.state,'',target.pathname+target.search);scrollPageTop();return;}
    // Static recovery actions target 404.html directly. Keep them in the same
    // local-navigation pipeline as notes/index routes so the persistent shell
    // is not replaced and Back works on the first click.
    if(!/[/](?:index[.]html)?$|[.]md(?:[/]|$)|[/][^/]+[.]html$/.test(target.pathname)) return;
    event.preventDefault(); closeMenu(); closeRelated(); closeGlobalSearch(); closeFolderBrowser(); loadBlogPage(target.href,true);
  });
  addEventListener('popstate',function(){
    if(document.body.dataset.blogNavigationControl==='external')return;
    if(!new URL(location.href).searchParams.get('series')||!document.querySelector('[data-blog-course]')) loadBlogPage(location.href,false);
  });
  document.addEventListener('keydown', function(event){
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); openGlobalSearch(); }
    if (event.key === 'Escape') { closeRelated(); closeGlobalSearch(); closeFolderBrowser(); }
  });
  body.dataset.blogRuntimeReady='true';
  document.dispatchEvent(new CustomEvent('html-server:runtime-ready'));
  if(pendingEarlyAction==='search')openGlobalSearch();else if(pendingEarlyAction==='folder')openFolderBrowser();
})();