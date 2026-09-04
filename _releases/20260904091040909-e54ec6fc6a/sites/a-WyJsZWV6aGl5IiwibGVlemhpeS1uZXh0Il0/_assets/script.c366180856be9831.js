(function(){window.__htmlServerLayoutArticleCard=function(context){var body=document.body,article=context.article,articleIndexNumber=context.index,card=context.card,articleCover=context.articleCover,applyThemeCover=context.applyThemeCover,themeCover=context.themeCover,siteUrl=context.siteUrl,folderRoute=context.folderRoute,staticMetaUrl=context.staticMetaUrl;function leezhiyIcon(name,style){var icon=document.createElement('i');icon.className=(style||'fa')+' fa-'+name;return icon;}function leezhiyMeta(name,style,label){var item=document.createElement('span'),iconWrap=document.createElement('span'),text=document.createElement('span');item.className='post-meta-item';iconWrap.className='post-meta-item-icon';iconWrap.append(leezhiyIcon(name,style));item.append(iconWrap);if(label){text.className='post-meta-item-text';text.textContent=label;item.append(text);}return item;}function leezhiyInteraction(kind,tag){var count=document.createElement(tag||'span');count.setAttribute('data-blog-interaction-'+kind,'');count.setAttribute('data-blog-interaction-path',article.path);count.textContent='0';return count;}function leezhiyDate(value){var date=new Date(value),pad=function(number){return String(number).padStart(2,'0');};if(Number.isNaN(date.getTime()))return {day:String(value||''),time:'00:00:00',datetime:''};var day=date.getFullYear()+'-'+pad(date.getMonth()+1)+'-'+pad(date.getDate()),time=pad(date.getHours())+':'+pad(date.getMinutes())+':'+pad(date.getSeconds()),offsetMinutes=-date.getTimezoneOffset(),offset=(offsetMinutes>=0?'+':'-')+pad(Math.floor(Math.abs(offsetMinutes)/60))+':'+pad(Math.abs(offsetMinutes)%60);return {day:day,time:time,datetime:day+'T'+time+offset};}function leezhiyWords(count){return count>=1000?(count/1000).toFixed(1).replace(/\.0$/,'')+'k':String(count);}
  card.classList.add('leezhiy-post-block');
  var header=document.createElement('header'),heading=document.createElement('h2'),articleLink=document.createElement('a');articleLink.href=article.href;articleLink.textContent=article.title;heading.append(articleLink);
  var meta=document.createElement('div');meta.className='leezhiy-post-meta post-meta';var published=leezhiyMeta('calendar','far','发表于'),publishedTime=document.createElement('time'),publishedDate=leezhiyDate(article.created||article.modified);publishedTime.textContent=publishedDate.day;publishedTime.dateTime=publishedDate.datetime;publishedTime.title='创建时间：'+publishedDate.day+' '+publishedDate.time;publishedTime.setAttribute('itemprop','dateCreated datePublished');published.append(publishedTime);meta.append(published);
  var folder=String(article.folder||'Root'),folderParts=folder.split(/[\/]+/).filter(Boolean);if(!folderParts.length)folderParts=['Root'];var category=leezhiyMeta('folder','far','分类于');folderParts.forEach(function(part,index){if(index)category.append(document.createTextNode('，'));var schema=document.createElement('span'),categoryLink=document.createElement('a');schema.setAttribute('itemprop','about');schema.setAttribute('itemscope','');schema.setAttribute('itemtype','http://schema.org/Thing');categoryLink.href=siteUrl('categories/'+folderParts.slice(0,index+1).map(encodeURIComponent).join('/')+'/');categoryLink.setAttribute('itemprop','url');categoryLink.setAttribute('rel','index');var name=document.createElement('span');name.setAttribute('itemprop','name');name.textContent=part;categoryLink.append(name);schema.append(categoryLink);category.append(schema);});meta.append(category);
  var articlePathname=new URL(article.href,location.href).pathname,visits=leezhiyMeta('eye','fa','阅读次数：');visits.id=articlePathname;visits.classList.add('leancloud_visitors');visits.dataset.flagTitle=article.title;visits.title='阅读次数';var visitCount=leezhiyInteraction('visits','span');visitCount.classList.add('leancloud-visitors-count');visits.append(visitCount);var comments=leezhiyMeta('comment','far','Valine：'),commentLink=document.createElement('a'),commentCount=leezhiyInteraction('comments','span');commentLink.title='valine';commentLink.href=article.href+'#valine-comments';commentLink.setAttribute('itemprop','discussionUrl');commentCount.className='post-comments-count valine-comment-count';commentCount.dataset.xid=articlePathname;commentCount.setAttribute('itemprop','commentCount');commentLink.append(commentCount);comments.append(commentLink);meta.append(visits,comments);
  var sourceWordCount=Number(article.daybookWordCount);if(Number.isFinite(sourceWordCount)){var words=leezhiyMeta('file-word','far'),wordValue=document.createElement('span');words.title='本文字数';wordValue.textContent=leezhiyWords(sourceWordCount);words.append(wordValue);var duration=leezhiyMeta('clock','far'),durationValue=document.createElement('span');duration.title='阅读时长';durationValue.textContent=Math.max(1,Math.ceil(sourceWordCount/400))+' 分钟';duration.append(durationValue);meta.append(words,duration);}header.append(heading,meta);
  var excerpt=document.createElement('div'),description=document.createElement('p');excerpt.className='leezhiy-post-excerpt';description.textContent=article.description||'Open this note to continue reading.';excerpt.append(description);
  var footer=document.createElement('footer'),more=document.createElement('a');more.className='leezhiy-read-more';more.href=article.href;more.textContent='阅读全文 »';footer.append(more);card.append(header,excerpt,footer);return card;
};})();
(function(){
  var installHooks=function(api){
    function renderSourcePagination(host,page,count,onPage){
      host.replaceChildren();host.hidden=count<=1;if(count<=1)return;
      function hrefFor(target){var url=new URL(location.href);if(target===1)url.searchParams.delete('page');else url.searchParams.set('page',String(target));return url.pathname+url.search+url.hash;}
      function bind(link,target){link.addEventListener('click',function(event){if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;event.preventDefault();onPage(target,true);});}
      function control(className,target,label,iconName,rel){var link=document.createElement('a'),icon=document.createElement('i');link.className=className;link.href=hrefFor(target);link.rel=rel;link.setAttribute('data-blog-page',String(target));icon.className='fa fa-angle-'+iconName;icon.setAttribute('aria-label',label);link.append(icon);bind(link,target);host.append(link);}
      if(page>1)control('extend prev',page-1,'上一页','left','prev');
      var values=[],last=0;for(var number=1;number<=count;number++)if(number===1||number===count||Math.abs(number-page)<=1)values.push(number);
      values.forEach(function(number){if(number-last>1){var gap=document.createElement('span');gap.className='space';gap.textContent='…';host.append(gap);}var item=document.createElement(number===page?'span':'a');item.className='page-number'+(number===page?' current':'');item.textContent=String(number);if(number===page)item.setAttribute('aria-current','page');else{item.href=hrefFor(number);item.setAttribute('data-blog-page',String(number));bind(item,number);}host.append(item);last=number;});
      if(page<count)control('extend next',page+1,'下一页','right','next');
    }
    api.registerLayoutHooks('leezhiy',{beginSoftNavigation:function(context){var handle={push:!!(context&&context.push),timer:0};if(window.Pace&&typeof window.Pace.restart==='function')handle.timer=window.setTimeout(function(){window.Pace.restart();},500);return handle;},endSoftNavigation:function(context){var handle=context&&context.handle;if(handle&&handle.timer)window.clearTimeout(handle.timer);if(handle&&handle.push===false&&window.Pace&&typeof window.Pace.restart==='function')window.Pace.restart();},syncOutlineState:function(links,activeLink){
    links.forEach(function(link){var item=link.closest('.nav-item');if(item)item.classList.remove('active','active-current');});
    var target=activeLink&&activeLink.closest('.nav-item');if(!target)return;target.classList.add('active','active-current');
    var parent=target.parentElement;while(parent&& !parent.matches('.post-toc')){if(parent.matches('.nav-item'))parent.classList.add('active');parent=parent.parentElement;}
  },renderDirectoryItem:function(context){
    var item=context.item,host=context.host,link=context.link;
    if(context.kind==='tags'){
      link.textContent=String(item.value||'');
      if(item.fontSize)link.style.fontSize=String(item.fontSize)+'px';
      if(item.color)link.style.color=String(item.color);
      host.append(link);return true;
    }
    if(context.kind==='categories'){
      function categoryNode(entry){var row=document.createElement('li'),anchor=document.createElement('a'),count=document.createElement('span');row.className='category-list-item leezhiy-category-list-item';anchor.className='category-list-link leezhiy-category-list-link';anchor.href=entry.href;anchor.textContent=entry.value;count.className='category-list-count leezhiy-category-list-count';count.textContent=String(entry.count||0);row.append(anchor,count);if(entry.children&&entry.children.length){var children=document.createElement('ul');children.className='category-list-child category-list leezhiy-category-list';entry.children.forEach(function(child){children.append(categoryNode(child));});row.append(children);}return row;}
      host.append(categoryNode(item));return true;
    }
    return false;
  },mountArchive:function(context){
    var host=context.host,pager=context.pager,articles=context.articles.slice().sort(function(left,right){return Number(right.created||right.modified||0)-Number(left.created||left.modified||0);});
    function dateParts(value){var date=new Date(Number(value)||0),part=function(number){return String(number).padStart(2,'0');},day=date.getFullYear()+'-'+part(date.getMonth()+1)+'-'+part(date.getDate());return{day:day,monthDay:part(date.getMonth()+1)+'-'+part(date.getDate()),datetime:date.toISOString()};}
    function timeline(items){var block=document.createElement('div'),collapse=document.createElement('div'),title=document.createElement('div'),heading=document.createElement('span'),year=NaN;block.className='post-block leezhiy-post-block leezhiy-collapse-block';collapse.className='posts-collapse leezhiy-posts-collapse';title.className='collection-title leezhiy-collection-title';heading.className='collection-header leezhiy-collection-header';heading.textContent='还行! 目前共计 '+context.total+' 篇日志。 继续努力。';title.append(heading);collapse.append(title);items.forEach(function(article){var created=article.created||article.modified||0,published=dateParts(created),nextYear=new Date(Number(created)||0).getFullYear();if(nextYear!==year){var yearBox=document.createElement('div'),yearLabel=document.createElement('span');year=nextYear;yearBox.className='collection-year leezhiy-collection-year';yearLabel.className='collection-header leezhiy-collection-header';yearLabel.textContent=String(year);yearBox.append(yearLabel);collapse.append(yearBox);}var item=document.createElement('article'),header=document.createElement('header'),meta=document.createElement('div'),time=document.createElement('time'),titleBox=document.createElement('div'),link=document.createElement('a'),name=document.createElement('span');item.className='leezhiy-collapse-article';item.setAttribute('itemscope','');item.setAttribute('itemtype','http://schema.org/Article');header.className='post-header leezhiy-collapse-post-header';meta.className='post-meta leezhiy-collapse-post-meta';time.setAttribute('itemprop','dateCreated');time.dateTime=published.datetime;time.setAttribute('content',published.day);time.textContent=published.monthDay;titleBox.className='post-title leezhiy-collapse-post-title';link.className='post-title-link';link.href=article.href;link.setAttribute('itemprop','url');name.setAttribute('itemprop','name');name.textContent=article.title;link.append(name);meta.append(time);titleBox.append(link);header.append(meta,titleBox);item.append(header);collapse.append(item);});block.append(collapse);return block;}
    function renderPager(page){renderSourcePagination(pager,page,context.pageCount,renderPage);}
    async function renderPage(requestedPage,scroll,preserveServerPage){var page=Math.min(context.pageCount,Math.max(1,requestedPage)),items=articles.slice((page-1)*context.pageSize,page*context.pageSize);if(preserveServerPage&&page===1&&!articles.length&&host.firstElementChild){renderPager(page);context.storePage(page);return;}if(context.liveDataUrl&&(!articles.length||page!==1)){var response=await fetch(context.liveDataUrl+'?'+new URLSearchParams({kind:'archive',page:String(page),size:String(context.pageSize)}));if(!response.ok)return;items=(await response.json()).items||items;}host.replaceChildren(timeline(items));renderPager(page);context.storePage(page);if(scroll)context.scrollToStart(host);}
    var initialPage=Number(new URLSearchParams(location.search).get('page'))||1;renderPage(initialPage,false,initialPage===1).catch(function(error){document.body.setAttribute('data-blog-controls-state','failed');document.body.setAttribute('data-blog-controls-error',String(error&&error.message||error));console.error('[html-server] Unable to mount Leezhiy archive',error);});return true;
  },mountTimeline:function(context){
    var needle=String(context.value||'').toLowerCase(),prefix=needle?needle+'/':'',filtered=context.articles.filter(function(article){if(context.kind==='tag')return (article.tags||[]).some(function(tag){return String(tag).toLowerCase()===needle;});if(context.kind==='category'){var folder=String(article.folder||'').toLowerCase();return folder===needle||!!prefix&&folder.indexOf(prefix)===0;}return false;}).sort(function(left,right){return Number(right.created||right.modified||0)-Number(left.created||left.modified||0);});
    function monthDay(value){var date=new Date(Number(value)||0);return String(date.getMonth()+1).padStart(2,'0')+'-'+String(date.getDate()).padStart(2,'0');}
    function timeline(items){var block=document.createElement('div'),collapse=document.createElement('div'),title=document.createElement('div'),heading=document.createElement('h2'),year=NaN;block.className='leezhiy-post-block leezhiy-collapse-block';collapse.className='leezhiy-posts-collapse';title.className='leezhiy-collection-title';heading.className='leezhiy-collection-header';heading.textContent=context.value+' '+(context.kind==='tag'?'标签':'分类');title.append(heading);collapse.append(title);items.forEach(function(article){var nextYear=new Date(Number(article.created||article.modified||0)).getFullYear();if(nextYear!==year){var yearBox=document.createElement('div'),yearLabel=document.createElement('span');year=nextYear;yearBox.className='leezhiy-collection-year';yearLabel.className='leezhiy-collection-header';yearLabel.textContent=String(year);yearBox.append(yearLabel);collapse.append(yearBox);}var item=document.createElement('article'),header=document.createElement('header'),meta=document.createElement('div'),time=document.createElement('time'),titleBox=document.createElement('div'),link=document.createElement('a');item.className='leezhiy-collapse-article';header.className='leezhiy-collapse-post-header';meta.className='leezhiy-collapse-post-meta';time.textContent=monthDay(article.created||article.modified);titleBox.className='leezhiy-collapse-post-title';link.href=article.href;link.textContent=article.title;meta.append(time);titleBox.append(link);header.append(meta,titleBox);item.append(header);collapse.append(item);});block.append(collapse);return block;}
    var total=Number(context.total)||filtered.length,pageCount=Math.max(1,Math.ceil(total/context.pageSize));function renderPager(page){renderSourcePagination(context.pager,page,pageCount,renderPage);}
    async function renderPage(requestedPage,scroll,preserveServerPage){var page=Math.min(pageCount,Math.max(1,requestedPage)),items=filtered.slice((page-1)*context.pageSize,page*context.pageSize);if(preserveServerPage&&page===1&&!filtered.length&&context.host.firstElementChild){renderPager(page);context.storePage(page);return;}if(context.liveDataUrl&&(!filtered.length||page!==1)){var query={kind:'articles',page:String(page),size:String(context.pageSize)};if(context.kind==='tag'){query.taxonomy='tags';query.value=context.value;}else{query.folder=context.value;query.folderTree='true';}var response=await fetch(context.liveDataUrl+'?'+new URLSearchParams(query));if(!response.ok)return;items=(await response.json()).items||items;}context.host.replaceChildren(timeline(items));renderPager(page);context.storePage(page);if(scroll)context.scrollToStart(context.host);}
    var initialPage=Number(new URLSearchParams(location.search).get('page'))||1;renderPage(initialPage,false,initialPage===1).catch(function(error){document.body.setAttribute('data-blog-controls-state','failed');document.body.setAttribute('data-blog-controls-error',String(error&&error.message||error));console.error('[html-server] Unable to mount Leezhiy taxonomy timeline',error);});return true;
  },renderPagination:function(context){renderSourcePagination(context.host,context.page,context.count,context.onPage);return true;},paginationOwnsClicks:true});};var hookApi=window.HtmlServerBlog;if(hookApi&&typeof hookApi.registerLayoutHooks==='function')installHooks(hookApi);else(window.__htmlServerBlogContributions=window.__htmlServerBlogContributions||[]).push(installHooks);
  if(document.body.dataset.blogLayout!=='leezhiy'||window.__htmlServerLeezhiyMounted)return;
  window.__htmlServerLeezhiyMounted=true;
  document.addEventListener('html-server:appearance-change',function(event){var next=event.detail&&event.detail.next;if(next&&next.layout!=='leezhiy'&&window.Pace&&typeof window.Pace.stop==='function')window.Pace.stop();});
  var body=document.body,scrollRoot=body.dataset.blogScrollMode==='window'?null:document.querySelector('.html-server-blog-app'),moon=document.querySelector('[data-leezhiy-moon-menu]'),moonToggle=document.querySelector('[data-leezhiy-moon-toggle]');
  var originTitle=document.title,titleTime=0,titleElement=document.querySelector('title');
  document.addEventListener('visibilitychange',function(){
    if(document.hidden){document.title='警告！警告！';clearTimeout(titleTime);}
    else{document.title='ヾ(◍°∇°◍)欢迎回来|'+originTitle;titleTime=window.setTimeout(function(){document.title=originTitle;},2000);}
  });
  if(titleElement&&window.MutationObserver)new MutationObserver(function(){var value=document.title;if(!document.hidden&&value&&value!=='警告！警告！'&&value.indexOf('ヾ(◍°∇°◍)欢迎回来|')!==0)originTitle=value;}).observe(titleElement,{childList:true,subtree:true,characterData:true});
  function toggleMoon(){var items=moon&&moon.querySelector('.moon-menu-items'),points=moon&&moon.querySelectorAll('.moon-menu-point'),actions=moon&&moon.querySelectorAll('.moon-menu-item'),open=!!(items&&!items.classList.contains('active'));if(items)items.classList.toggle('active',open);if(points&&points.length>2){points[0].setAttribute('cx',open?'-.8rem':'0');points[0].setAttribute('cy',open?'0':'-.8rem');points[2].setAttribute('cx',open?'.8rem':'0');points[2].setAttribute('cy',open?'0':'.8rem');}actions&&actions.forEach(function(item,index){item.style.top=open?(-3-3*index)+'rem':'1rem';item.style.opacity=open?'.9':'0';});moonToggle&&moonToggle.setAttribute('aria-expanded',String(open));}
  moonToggle&&moonToggle.addEventListener('click',toggleMoon);moonToggle&&moonToggle.addEventListener('keydown',function(event){if(event.key==='Enter'||event.key===' '){event.preventDefault();toggleMoon();}});
  var shareRoots=Array.prototype.slice.call(document.querySelectorAll('[data-leezhiy-share]'));
  function closeShare(root){if(!root)return;root.classList.remove('need-share-button-opened');var toggle=root.querySelector('[data-leezhiy-share-toggle]'),panel=root.querySelector('.leezhiy-share-panel'),code=root.querySelector('.need-share-wechat-code-image');if(toggle)toggle.setAttribute('aria-expanded','false');if(panel)panel.setAttribute('aria-hidden','true');root.querySelectorAll('[data-leezhiy-share-network]').forEach(function(item){item.setAttribute('tabindex','-1');});if(code)code.remove();}
  function openShare(root){shareRoots.forEach(function(other){if(other!==root)closeShare(other);});root.classList.add('need-share-button-opened');var toggle=root.querySelector('[data-leezhiy-share-toggle]'),panel=root.querySelector('.leezhiy-share-panel');if(toggle)toggle.setAttribute('aria-expanded','true');if(panel)panel.setAttribute('aria-hidden','false');root.querySelectorAll('[data-leezhiy-share-network]').forEach(function(item){item.setAttribute('tabindex','0');});}
  function shareData(){return{title:document.title,url:location.href,image:(document.querySelector('meta[property="og:image"]')||document.querySelector('meta[name="twitter:image"]')||{}).content||'',description:(document.querySelector('meta[property="og:description"]')||document.querySelector('meta[name="description"]')||{}).content||''};}
  function sharePopup(url){var left=(innerWidth||document.documentElement.clientWidth)/2-300+(window.screenLeft||0),top=(innerHeight||document.documentElement.clientHeight)/2-250+(window.screenTop||0),popup=window.open(url,'targetWindow','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600, height=500, top='+top+', left='+left);if(window.focus&&popup)popup.focus();}
  function runShare(root,network){var data=shareData(),title=encodeURIComponent(data.title),url=encodeURIComponent(data.url),image=encodeURIComponent(data.image),description=encodeURIComponent(data.description),target='';if(network==='wechat'){var panel=root.querySelector('.leezhiy-share-panel'),old=root.querySelector('.need-share-wechat-code-image');if(old)old.remove();else if(panel){var code=document.createElement('img');code.src='https://api.qrserver.com/v1/create-qr-code/?size=200x200&data='+url;code.alt='loading wechat image...';code.className='need-share-wechat-code-image';if(root.classList.contains('leezhiy-share-float'))panel.insertBefore(code,panel.firstChild);else panel.appendChild(code);}return;}if(network==='weibo')target='http://v.t.sina.com.cn/share/share.php?title='+title+'&url='+url+'&pic='+image;else if(network==='douban')target='https://www.douban.com/share/service?name='+title+'&href='+url+'&image='+image;else if(network==='qqzone')target='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title='+title+'&url='+url+'&pics='+image+'&desc='+description;else if(network==='mailto'){location.href='mailto:?subject='+title+'&body=Thought%20you%20might%20enjoy%20reading%20this:%20'+url+'%20-%20'+description;return;}else if(network==='twitter')target='https://twitter.com/intent/tweet?text='+title+'&url='+url;else if(network==='pinterest')target='https://pinterest.com/pin/create/bookmarklet/?is_video=false&media='+image+'&url='+url+'&description='+title;else if(network==='facebook')target='https://www.facebook.com/share.php?u='+url+'&title='+title;else if(network==='googleplus')target='https://plus.google.com/share?url='+url;else if(network==='reddit')target='https://www.reddit.com/submit?url='+url+'&title='+title;else if(network==='delicious')target='https://del.icio.us/post?url='+url+'&title='+title+'&notes='+description;else if(network==='stumbleupon')target='https://www.stumbleupon.com/submit?url='+url+'&title='+title;else if(network==='linkedin')target='https://www.linkedin.com/shareArticle?mini=true&url='+url+'&title='+title+'&source='+encodeURIComponent(location.host);else if(network==='tumblr')target='https://www.tumblr.com/share?v=3&u='+url+'&t='+title;else if(network==='googlebookmarks')target='https://www.google.com/bookmarks/mark?op=edit&bkmk='+url+'&title='+title+'&annotation='+description;else if(network==='newsvine')target='https://www.newsvine.com/_tools/seed&save?u='+url+'&h='+title;else if(network==='evernote')target='https://www.evernote.com/clip.action?url='+url+'&title='+title;else if(network==='friendfeed')target='https://www.friendfeed.com/share?url='+url+'&title='+title;else if(network==='vkontakte')target='https://vkontakte.ru/share.php?url='+url+'&title='+title+'&description='+description+'&image='+image+'&noparse=true';else if(network==='odnoklassniki')target='https://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st.comments='+description+'&st._surl='+url;else if(network==='mailru')target='https://connect.mail.ru/share?url='+url+'&title='+title+'&description='+description+'&imageurl='+image;if(target)sharePopup(target);}
  shareRoots.forEach(function(root){var toggle=root.querySelector('[data-leezhiy-share-toggle]');if(toggle)toggle.addEventListener('click',function(event){event.stopPropagation();if(root.classList.contains('need-share-button-opened'))closeShare(root);else openShare(root);});root.querySelectorAll('[data-leezhiy-share-network]').forEach(function(item){item.addEventListener('click',function(event){event.preventDefault();event.stopPropagation();runShare(root,item.getAttribute('data-leezhiy-share-network')||'');});});});
  document.addEventListener('click',function(event){shareRoots.forEach(function(root){if(root.classList.contains('need-share-button-opened')&&!root.contains(event.target))closeShare(root);});});document.addEventListener('keydown',function(event){if(event.key==='Escape')shareRoots.forEach(closeShare);});
  document.querySelectorAll('[data-leezhiy-reward-toggle]').forEach(function(button){button.addEventListener('click',function(){var panel=document.querySelector('[data-leezhiy-reward-panel]'),open=!!(panel&&panel.hidden);if(panel)panel.hidden=!open;button.setAttribute('aria-expanded',String(open));});});
  document.querySelectorAll('[data-blog-scroll-bottom]').forEach(function(button){button.addEventListener('click',function(){if(scrollRoot)scrollRoot.scroll({top:Math.max(0,scrollRoot.scrollHeight-scrollRoot.clientHeight),behavior:'smooth'});else{var viewport=document.documentElement.offsetHeight,total=document.documentElement.scrollHeight;window.scroll({top:total-viewport,behavior:'smooth'});}});});
  document.querySelectorAll('[data-leezhiy-smooth-scroll-top]').forEach(function(button){button.addEventListener('click',function(){if(scrollRoot)scrollRoot.scroll({top:0,behavior:'smooth'});else window.scroll({top:0,behavior:'smooth'});});});
  var commentJump=document.querySelector('[data-leezhiy-comment-jump]');commentJump&&commentJump.addEventListener('click',function(){var comments=document.querySelector('.html-server-blog-comments,[data-blog-comments]');if(comments)comments.scrollIntoView({behavior:'smooth',block:'start'});});
  var header=document.querySelector('.leezhiy-header-inner'),menu=document.querySelector('[data-leezhiy-nav-toggle]');menu&&menu.addEventListener('click',function(){header&&header.classList.toggle('is-open');});
  var sidebar=document.querySelector('.leezhiy-sidebar'),sidebarInner=sidebar&&sidebar.querySelector('.leezhiy-sidebar-inner'),scrim=document.querySelector('[data-blog-scrim]');
  function closeSidebar(){sidebar&&sidebar.classList.remove('is-open');scrim&&scrim.classList.remove('is-visible');}
  menu&&menu.addEventListener('contextmenu',function(event){event.preventDefault();sidebar&&sidebar.classList.add('is-open');scrim&&scrim.classList.add('is-visible');});scrim&&scrim.addEventListener('click',closeSidebar);
  var tabs=document.querySelectorAll('.sidebar-nav li'),panels=document.querySelectorAll('.sidebar-panel'),tabMotion=0;
  function animatePanelOpacity(target,value,complete){if(!target){complete&&complete();return;}if(window.anime){window.anime({targets:target,duration:200,easing:'linear',opacity:value,complete:complete});return;}var motion=target.animate([{opacity:getComputedStyle(target).opacity},{opacity:String(value)}],{duration:200,easing:'linear',fill:'forwards'});motion.onfinish=function(){target.style.opacity=String(value);motion.cancel();complete&&complete();};}
  tabs.forEach(function(tab,index){tab.addEventListener('click',function(){if(tab.classList.contains('sidebar-nav-active'))return;var token=++tabMotion,current=document.querySelector('.sidebar-panel-active'),target=panels[index];animatePanelOpacity(current,0,function(){if(token!==tabMotion)return;current&&current.classList.remove('sidebar-panel-active');if(target){target.style.opacity='0';target.classList.add('sidebar-panel-active');animatePanelOpacity(target,1,function(){if(token===tabMotion)target.style.opacity='1';});}});tabs.forEach(function(item){item.classList.remove('sidebar-nav-active');});tab.classList.add('sidebar-nav-active');});});
  function readScrollPosition(){return scrollRoot?scrollRoot.scrollTop:Math.max(window.scrollY||0,document.documentElement.scrollTop||0);}
  function syncSidebarAffix(){if(!sidebar||!sidebarInner)return;if(innerWidth<992){sidebarInner.classList.remove('affix','affix-bottom');sidebarInner.classList.add('affix-top');return;}var position=readScrollPosition(),sidebarTop=sidebar.getBoundingClientRect().top+position,affixed=position>sidebarTop-12;sidebarInner.classList.toggle('affix',affixed);sidebarInner.classList.toggle('affix-top',!affixed);sidebarInner.classList.remove('affix-bottom');}
  function syncSidebarDimensions(){var root=scrollRoot||document.documentElement,nav=document.querySelector('.sidebar-nav'),back=document.querySelector('.back-to-top'),navHeight=nav&&getComputedStyle(nav).display!=='none'?nav.offsetHeight:0,backHeight=back?back.offsetHeight:0,padding=36+navHeight+backHeight+2,max=Math.max(80,root.clientHeight-padding);panels.forEach(function(panel){panel.style.maxHeight=max+'px';});syncSidebarAffix();}
  syncSidebarDimensions();addEventListener('resize',syncSidebarDimensions,{passive:true});
  var percent=document.querySelector('[data-leezhiy-scroll-percent]'),readingProgress=document.querySelector('[data-leezhiy-reading-progress]'),backToTop=percent&&percent.closest('.back-to-top'),moonText=moon&&moon.querySelector('.moon-menu-text'),moonPoints=moon&&moon.querySelector('.moon-menu-points'),moonBorder=moon&&moon.querySelector('.moon-menu-border');function updateScroll(){var position=readScrollPosition(),maximum=scrollRoot?Math.max(1,scrollRoot.scrollHeight-scrollRoot.clientHeight):Math.max(1,document.documentElement.scrollHeight-innerHeight),value=Math.max(0,Math.min(100,position/maximum*100)),rounded=Math.round(value);syncSidebarAffix();if(percent)percent.textContent=rounded+'%';if(readingProgress){readingProgress.style.width=value.toFixed(2)+'%';readingProgress.setAttribute('aria-valuenow',value.toFixed(2));}if(backToTop)backToTop.classList.toggle('back-to-top-on',position>50);if(moonText&&moonPoints){moonText.textContent=rounded+'%';moonText.style.display=rounded?'block':'none';moonPoints.style.display=rounded?'none':'block';}if(moonBorder)moonBorder.style.strokeDasharray=196*rounded/100+' 196';}(scrollRoot||window).addEventListener('scroll',updateScroll,{passive:true});document.addEventListener('html-server:after-page-mount',function(){requestAnimationFrame(updateScroll);});updateScroll();
  // Re-bind layout shell events after every soft-navigation so the sidebar
  // tabs, share buttons, reward toggle, etc. still respond when the user
  // navigates from the home page to an article without a full reload. The
  // original IIFE captured node references at first mount; the soft
  // navigator replaces the sidebar inner subtree with one that has no
  // handlers, so we re-query and re-bind, deduplicating via a
  // data-leezhiy-bound flag.
  function bindPageControls(){sidebarInner=sidebar&&sidebar.querySelector('.leezhiy-sidebar-inner');panels=document.querySelectorAll('.sidebar-panel');percent=document.querySelector('[data-leezhiy-scroll-percent]');readingProgress=document.querySelector('[data-leezhiy-reading-progress]');backToTop=percent&&percent.closest('.back-to-top');shareRoots=Array.prototype.slice.call(document.querySelectorAll('[data-leezhiy-share]'));var tabs=document.querySelectorAll('.sidebar-nav li'),tabMotion=0;tabs.forEach(function(tab,index){if(tab.dataset.leezhiyBound)return;tab.dataset.leezhiyBound='1';tab.addEventListener('click',function(){if(tab.classList.contains('sidebar-nav-active'))return;var token=++tabMotion,current=document.querySelector('.sidebar-panel-active'),target=panels[index];animatePanelOpacity(current,0,function(){if(token!==tabMotion)return;current&&current.classList.remove('sidebar-panel-active');if(target){target.style.opacity='0';target.classList.add('sidebar-panel-active');animatePanelOpacity(target,1,function(){if(token===tabMotion)target.style.opacity='1';});}});tabs.forEach(function(item){item.classList.remove('sidebar-nav-active');});tab.classList.add('sidebar-nav-active');});});document.querySelectorAll('[data-leezhiy-share-toggle]').forEach(function(button){if(button.dataset.leezhiyBound)return;button.dataset.leezhiyBound='1';button.addEventListener('click',function(event){event.stopPropagation();var root=button.closest('[data-leezhiy-share]');if(!root)return;if(root.classList.contains('need-share-button-opened'))closeShare(root);else openShare(root);});});document.querySelectorAll('[data-leezhiy-share-network]').forEach(function(item){if(item.dataset.leezhiyBound)return;item.dataset.leezhiyBound='1';item.addEventListener('click',function(event){event.preventDefault();event.stopPropagation();var root=item.closest('[data-leezhiy-share]');if(!root)return;runShare(root,item.getAttribute('data-leezhiy-share-network')||'');});});document.querySelectorAll('[data-leezhiy-reward-toggle]').forEach(function(button){if(button.dataset.leezhiyBound)return;button.dataset.leezhiyBound='1';button.addEventListener('click',function(){var panel=document.querySelector('[data-leezhiy-reward-panel]'),open=!!(panel&&panel.hidden);if(panel)panel.hidden=!open;button.setAttribute('aria-expanded',String(open));});});document.querySelectorAll('[data-blog-scroll-bottom]').forEach(function(button){if(button.dataset.leezhiyBound)return;button.dataset.leezhiyBound='1';button.addEventListener('click',function(){if(scrollRoot)scrollRoot.scroll({top:Math.max(0,scrollRoot.scrollHeight-scrollRoot.clientHeight),behavior:'smooth'});else{var viewport=document.documentElement.offsetHeight,total=document.documentElement.scrollHeight;window.scroll({top:total-viewport,behavior:'smooth'});}});});document.querySelectorAll('[data-leezhiy-smooth-scroll-top]').forEach(function(button){if(button.dataset.leezhiyBound)return;button.dataset.leezhiyBound='1';button.addEventListener('click',function(){if(scrollRoot)scrollRoot.scroll({top:0,behavior:'smooth'});else window.scroll({top:0,behavior:'smooth'});});});var commentJump=document.querySelector('[data-leezhiy-comment-jump]');if(commentJump&&!commentJump.dataset.leezhiyBound){commentJump.dataset.leezhiyBound='1';commentJump.addEventListener('click',function(){var comments=document.querySelector('.html-server-blog-comments,[data-blog-comments]');if(comments)comments.scrollIntoView({behavior:'smooth',block:'start'});});}var menu=document.querySelector('[data-leezhiy-nav-toggle]');if(menu&&!menu.dataset.leezhiyBound){menu.dataset.leezhiyBound='1';menu.addEventListener('click',function(){var header=document.querySelector('.leezhiy-header-inner');if(header)header.classList.toggle('is-open');});menu.addEventListener('contextmenu',function(event){event.preventDefault();var sidebar=document.querySelector('.leezhiy-sidebar');if(sidebar)sidebar.classList.add('is-open');var scrim=document.querySelector('[data-blog-scrim]');if(scrim)scrim.classList.add('is-visible');});}var scrim=document.querySelector('[data-blog-scrim]');if(scrim&&!scrim.dataset.leezhiyBound){scrim.dataset.leezhiyBound='1';scrim.addEventListener('click',closeSidebar);}}document.querySelectorAll('.sidebar-nav li,[data-leezhiy-share-toggle],[data-leezhiy-share-network],[data-leezhiy-reward-toggle],[data-blog-scroll-bottom],[data-leezhiy-smooth-scroll-top],[data-leezhiy-comment-jump],[data-leezhiy-nav-toggle],[data-blog-scrim]').forEach(function(node){node.dataset.leezhiyBound='1';});document.addEventListener('html-server:after-page-mount',function(){bindPageControls();syncSidebarDimensions();updateScroll();});
  // The published source concatenates two initializers. Preserve its two mousedown timelines deliberately.
  var fireworks=document.querySelector('[data-leezhiy-fireworks]'),anime=window.anime;if(fireworks&&anime){var fctx=fireworks.getContext('2d'),numberOfParticules=30,pointerX=0,pointerY=0,colors=['#FF1461','#18FF92','#5A87FF','#FBF38C'];function updateCoords(event){var box=fireworks.getBoundingClientRect();pointerX=(event.clientX||event.touches[0].clientX)-box.left;pointerY=event.clientY||event.touches[0].clientY-box.top;}function setParticuleDirection(particle){var angle=anime.random(0,180)*Math.PI/90,distance=anime.random(25,90),signed=[-1,1][anime.random(0,1)]*distance;return{x:particle.x+signed*Math.cos(angle),y:particle.y+signed*Math.sin(angle)};}function createParticule(x,y){var particle={x:x,y:y};particle.color=colors[anime.random(0,colors.length-1)];particle.radius=anime.random(8,16);particle.endPos=setParticuleDirection(particle);particle.draw=function(){fctx.beginPath();fctx.arc(particle.x,particle.y,particle.radius,0,2*Math.PI,true);fctx.fillStyle=particle.color;fctx.fill();};return particle;}function createCircle(x,y){var circle={x:x,y:y,color:'#F00',radius:.1,alpha:.5,lineWidth:6};circle.draw=function(){fctx.globalAlpha=circle.alpha;fctx.beginPath();fctx.arc(circle.x,circle.y,circle.radius,0,2*Math.PI,true);fctx.lineWidth=circle.lineWidth;fctx.strokeStyle=circle.color;fctx.stroke();fctx.globalAlpha=1;};return circle;}function renderParticule(animation){for(var index=0;index<animation.animatables.length;index++)animation.animatables[index].target.draw();}function animateParticules(x,y){var circle=createCircle(x,y),particles=[];for(var index=0;index<numberOfParticules;index++)particles.push(createParticule(x,y));anime.timeline().add({targets:particles,x:function(particle){return particle.endPos.x;},y:function(particle){return particle.endPos.y;},radius:.1,duration:anime.random(600,900),easing:'easeOutExpo',update:renderParticule}).add({targets:circle,radius:anime.random(40,80),lineWidth:0,alpha:{value:0,easing:'linear',duration:anime.random(300,400)},duration:anime.random(600,900),easing:'easeOutExpo',update:renderParticule,offset:0});}function debounce(callback,delay){var timeout;return function(){var self=this,args=arguments;clearTimeout(timeout);timeout=setTimeout(function(){callback.apply(self,args);},delay);};}var sizeFire=debounce(function(){fireworks.width=2*innerWidth;fireworks.height=2*innerHeight;fireworks.style.width=innerWidth+'px';fireworks.style.height=innerHeight+'px';fireworks.getContext('2d').scale(2,2);},500),render=anime({duration:Infinity,update:function(){fctx.clearRect(0,0,fireworks.width,fireworks.height);}});function fire(event){if(event.target.id!=='sidebar'&&event.target.id!=='toggle-sidebar'&&event.target.nodeName!=='A'&&event.target.nodeName!=='IMG'){render.play();updateCoords(event);animateParticules(pointerX,pointerY);}}function bindFireworks(){document.addEventListener('mousedown',function(event){fire(event);},false);}bindFireworks();bindFireworks();sizeFire();addEventListener('resize',sizeFire,false);}
})();
(async function(){
  var body = document.body;
  var themeImageGroups={};
  try{var themeImageGroupsNode=document.querySelector('[data-blog-theme-image-groups]');themeImageGroups=themeImageGroupsNode?JSON.parse(themeImageGroupsNode.textContent||'{}'):{};}catch(error){themeImageGroups={};}
  
  
  var interactionPluginConfig=(window.__htmlServerPlugins&&window.__htmlServerPlugins['blog-comment-and-viewcount'])||{enabled:true,backend:'json',apiBaseUrl:'',turnstileSiteKey:'',staticFallback:'local-overlay'};
  var interactionsEnabled=interactionPluginConfig.enabled!==false;
  var interactionApiBase=String(interactionPluginConfig.apiBaseUrl||'').replace(/\/+$/,'');
  var remoteInteractionBackend=interactionPluginConfig.backend==='remote-api';
  var remoteInteractionApi=remoteInteractionBackend&&!!interactionApiBase;
  var interactionStaticFallback=String(interactionPluginConfig.staticFallback||'local-overlay');
  var staticInteractionFiles=window.__htmlServerStaticInteractions||null;
  if(staticInteractionFiles){staticInteractionFiles=Object.keys(staticInteractionFiles).reduce(function(result,key){var value=staticInteractionFiles[key];if(value)result[key]=new URL(String(value),location.href).href;return result;},{});}
  var staticInteractionCache={},interactionStatsCache={},siteInteractionStatsCache=null;
  var presenceEnabled=interactionsEnabled&&interactionPluginConfig.presenceEnabled===true;
  var presenceSocket=null,presencePath='',presenceReconnectTimer=0,presenceReconnectAttempt=0,presenceHiddenTimer=0,presenceManualClose=false;
  var commentEmotionRequest=null,commentEmotionIndex={};
  var commentMarkdownParser=null,commentMarkdownRequest=null;
  function interactionApi(path){return remoteInteractionApi?interactionApiBase+path:path;}
  function interactionRequest(path,options){if(remoteInteractionBackend&&!remoteInteractionApi)return Promise.reject(new Error('Remote interaction API is not configured'));return fetch(interactionApi(path),remoteInteractionApi?Object.assign({mode:'cors',credentials:'omit'},options||{}):options);}
  function normalizeInteractionPath(value){return String(value||'').trim().replace(/^\/+|\/+$/g,'').slice(0,512);}
  function interactionNodes(root,selector){var scope=root||document,nodes=Array.from(scope.querySelectorAll(selector));if(scope.nodeType===1&&scope.matches&&scope.matches(selector))nodes.unshift(scope);return nodes;}
  function setPresenceState(value){document.documentElement.setAttribute('data-blog-presence-state',value);document.dispatchEvent(new CustomEvent('html-server:blog-presence-state',{detail:{state:value}}));}
  function presenceHooks(){return document.querySelector('[data-blog-presence-site],[data-blog-presence-page]');}
  function presencePagePath(){var page=document.querySelector('[data-blog-presence-page]'),interactionPage=document.querySelector('[data-blog-interaction-page],[data-blog-interaction-page-location]');if(page)return normalizeInteractionPath(page.getAttribute('data-blog-presence-path')||location.pathname)||'home';if(interactionPage)return interactionPage.hasAttribute('data-blog-interaction-page-location')?(normalizeInteractionPath(location.pathname)||'home'):(normalizeInteractionPath(interactionPage.getAttribute('data-blog-interaction-page'))||'home');return normalizeInteractionPath(location.pathname)||'home';}
  function presenceUrl(path){try{var url=new URL(interactionApiBase+'/api/blog/interactions/presence');url.protocol=url.protocol==='https:'?'wss:':'ws:';url.searchParams.set('path',path);return url.href;}catch(error){return'';}}
  function applyPresence(value){if(!value||value.type!=='presence')return;var path=normalizeInteractionPath(value.path),siteViewers=Number(value.siteViewers),pageViewers=Number(value.pageViewers);if(!Number.isFinite(siteViewers)||!Number.isFinite(pageViewers))return;document.querySelectorAll('[data-blog-presence-site]').forEach(function(node){node.textContent=String(siteViewers);});document.querySelectorAll('[data-blog-presence-page]').forEach(function(node){var expected=normalizeInteractionPath(node.getAttribute('data-blog-presence-path')||presencePath);if(expected===path)node.textContent=String(pageViewers);});document.dispatchEvent(new CustomEvent('html-server:blog-presence',{detail:{path:path,pageViewers:pageViewers,siteViewers:siteViewers}}));}
  function cancelPresenceReconnect(){if(presenceReconnectTimer){clearTimeout(presenceReconnectTimer);presenceReconnectTimer=0;}}
  function closePresence(state){presenceManualClose=true;cancelPresenceReconnect();var socket=presenceSocket;presenceSocket=null;presencePath='';if(socket&&(socket.readyState===0||socket.readyState===1))try{socket.close(1000,state||'disabled');}catch(error){}setPresenceState(state||'disabled');}
  function schedulePresenceReconnect(){if(!presenceEnabled||!presenceHooks()||document.hidden)return;cancelPresenceReconnect();var delay=Math.min(30000,1000*Math.pow(2,Math.min(presenceReconnectAttempt,5))),jitter=Math.floor(delay*.2*Math.random());presenceReconnectAttempt++;setPresenceState('reconnecting');presenceReconnectTimer=setTimeout(function(){presenceReconnectTimer=0;connectPresence();},delay+jitter);}
  function connectPresence(){if(!presenceEnabled){closePresence('disabled');return;}if(!presenceHooks()){closePresence('inactive');return;}if(!remoteInteractionApi){closePresence('unconfigured');return;}if(typeof WebSocket!=='function'){closePresence('unavailable');return;}var path=presencePagePath();if(presenceSocket&&presenceSocket.readyState===1){if(path!==presencePath){presencePath=path;try{presenceSocket.send(JSON.stringify({type:'navigate',path:path}));}catch(error){}}return;}if(presenceSocket&&presenceSocket.readyState===0)return;var url=presenceUrl(path);if(!url){closePresence('unconfigured');return;}cancelPresenceReconnect();presenceManualClose=false;presencePath=path;setPresenceState('connecting');var socket;try{socket=new WebSocket(url);}catch(error){schedulePresenceReconnect();return;}presenceSocket=socket;socket.addEventListener('open',function(){if(presenceSocket!==socket)return;presenceReconnectAttempt=0;setPresenceState('connected');});socket.addEventListener('message',function(event){if(presenceSocket!==socket||typeof event.data!=='string'||event.data.length>4096)return;try{applyPresence(JSON.parse(event.data));}catch(error){}});socket.addEventListener('close',function(){if(presenceSocket!==socket)return;presenceSocket=null;if(!presenceManualClose)schedulePresenceReconnect();});socket.addEventListener('error',function(){if(presenceSocket===socket)setPresenceState('unavailable');});}
  function hydratePresence(){connectPresence();}
  function uniqueComments(values){var seen=new Set();return values.filter(function(comment){if(!comment||!comment.id||seen.has(comment.id))return false;seen.add(comment.id);return true;});}
  function commentMarkdownAssetUrl(){return commentEmotionBaseUrl()+'markdown-it.umd.min.js';}
  function createCommentMarkdownParser(){var factory=window.markdownit;if(typeof factory!=='function')throw new Error('markdown-it is unavailable');var parser=factory({html:false,linkify:true,breaks:true,typographer:false}),defaultImage=parser.renderer.rules.image||function(tokens,index,options,environment,self){return self.renderToken(tokens,index,options);};parser.renderer.rules.link_open=function(tokens,index,options,environment,self){tokens[index].attrSet('target','_blank');tokens[index].attrSet('rel','noopener noreferrer');return self.renderToken(tokens,index,options);};parser.renderer.rules.image=function(tokens,index,options,environment,self){tokens[index].attrJoin('class','html-server-comment-emotion');tokens[index].attrSet('loading','lazy');return defaultImage(tokens,index,options,environment,self);};return parser;}
  function loadCommentMarkdown(){if(commentMarkdownParser)return Promise.resolve(commentMarkdownParser);if(commentMarkdownRequest)return commentMarkdownRequest;commentMarkdownRequest=new Promise(function(resolve,reject){function ready(){try{commentMarkdownParser=createCommentMarkdownParser();resolve(commentMarkdownParser);}catch(error){reject(error);}}if(typeof window.markdownit==='function'){ready();return;}var script=document.createElement('script');script.src=commentMarkdownAssetUrl();script.async=true;script.dataset.htmlServerCommentMarkdown='markdown-it';script.onload=ready;script.onerror=function(){reject(new Error('Unable to load markdown-it'));};document.head.append(script);});return commentMarkdownRequest;}
  function commentEmotionBaseUrl(){if(staticInteractionFiles&&staticInteractionFiles.comments)return new URL('emotions/',new URL(String(staticInteractionFiles.comments),location.href)).href;return'/api/blog/interactions/emotions/';}
  function commentEmotionUrl(file){return commentEmotionBaseUrl()+String(file||'').split('/').map(encodeURIComponent).join('/');}
  function loadCommentEmotions(){if(commentEmotionRequest)return commentEmotionRequest;commentEmotionRequest=fetch(commentEmotionBaseUrl()+'manifest.json',{credentials:'same-origin',cache:'force-cache'}).then(function(response){if(!response.ok)throw new Error('Comment emotions unavailable');return response.json();}).then(function(payload){commentEmotionIndex={};(payload.packages||[]).forEach(function(group){(group.items||[]).forEach(function(item){if(item.token&&item.file)commentEmotionIndex[item.token]=item.file;});});return payload;});return commentEmotionRequest;}
  function expandCommentEmotionCodes(value){return String(value||'').replace(/:([A-Za-z0-9_-]+):/g,function(source,token){var file=commentEmotionIndex[token];return file?'!['+token+']('+commentEmotionUrl(file)+')':source;});}
  function commentClientEnvironment(){var ua=navigator.userAgent||'',browser=['Unknown',''],os=['Unknown',''],match;if((match=ua.match(/Edg\/([\d.]+)/)))browser=['Microsoft Edge',match[1]];else if((match=ua.match(/Chrome\/([\d.]+)/)))browser=['Google Chrome',match[1]];else if((match=ua.match(/Firefox\/([\d.]+)/)))browser=['Mozilla Firefox',match[1]];else if((match=ua.match(/Version\/([\d.]+).*Safari/)))browser=['Safari',match[1]];if((match=ua.match(/Windows NT ([\d.]+)/)))os=['Windows',match[1]==='10.0'?'10/11':match[1]];else if((match=ua.match(/Android ([\d.]+)/)))os=['Android',match[1]];else if((match=ua.match(/(?:iPhone OS|CPU OS) ([\d_]+)/)))os=['iOS',match[1].replace(/_/g,'.')];else if((match=ua.match(/Mac OS X ([\d_]+)/)))os=['macOS',match[1].replace(/_/g,'.')];else if(/Linux/.test(ua))os=['Linux',''];return{country:'',region:'',city:'',browserName:browser[0],browserVersion:browser[1],osName:os[0],osVersion:os[1],deviceType:/Mobile|Android|iPhone|iPad/.test(ua)?(/iPad|Tablet/.test(ua)?'tablet':'mobile'):'desktop',deviceVendor:'',deviceModel:'',language:navigator.language||'',timezone:Intl.DateTimeFormat().resolvedOptions().timeZone||'',screenWidth:screen.width||0,screenHeight:screen.height||0};}
  function staticInteractionFile(kind){return staticInteractionFiles&&staticInteractionFiles[kind]?new URL(String(staticInteractionFiles[kind]),location.href).href:'';}
  function loadStaticInteractions(kind){if(staticInteractionCache[kind])return staticInteractionCache[kind];var source=staticInteractionFile(kind);if(!source)return Promise.resolve(null);staticInteractionCache[kind]=fetch(source,{headers:{Accept:'application/json'}}).then(function(response){if(!response.ok)throw new Error('Static interaction snapshot unavailable');return response.json();});return staticInteractionCache[kind];}
  function updateInteractionNodes(stats,root){Object.keys(stats||{}).forEach(function(articlePath){var value=stats[articlePath]||{},visits=Number(value.visits==null?value.views:value.visits)||0,visitors=Number(value.visitors)||0;value.views=visits;value.visits=visits;value.visitors=visitors;interactionStatsCache[articlePath]=value;interactionNodes(root,'[data-blog-interaction-path="'+CSS.escape(articlePath)+'"]').forEach(function(node){if(node.hasAttribute('data-blog-interaction-views')||node.hasAttribute('data-blog-interaction-visits'))node.textContent=String(visits);if(node.hasAttribute('data-blog-interaction-visitors'))node.textContent=String(visitors);if(node.hasAttribute('data-blog-interaction-comments'))node.textContent=String(value.comments||0);});});}
  function localStaticViewCounts(){try{return JSON.parse(localStorage.getItem('html-server-blog-static-views')||'{}')||{};}catch(error){return{};}}
  function loadSnapshotStats(paths,root){if(interactionStaticFallback==='disabled')return Promise.reject(new Error('No interaction fallback'));return Promise.all([loadStaticInteractions('views'),loadStaticInteractions('comments')]).then(function(values){var viewPayload=values[0]||{},commentPayload=values[1]||{},views=viewPayload.views||{},comments=commentPayload.comments||[],localViews=interactionStaticFallback==='local-overlay'?localStaticViewCounts():{},stats={};paths.forEach(function(articlePath){var stored=views[articlePath]||{},local=localViews[articlePath]||{},localVisits=typeof local==='number'?local:Number(local.visits)||0,localVisitors=typeof local==='object'&&local.visitor?1:0,visits=(Number(stored.visits==null?stored.count:stored.visits)||0)+localVisits;stats[articlePath]={path:articlePath,views:visits,visits:visits,visitors:(Number(stored.visitors)||0)+localVisitors,comments:comments.filter(function(comment){return normalizeInteractionPath(comment.path)===articlePath;}).length};});updateInteractionNodes(stats,root);return stats;});}
  function updateSiteInteractionStats(value,root){var visits=Number(value&&value.visits==null?value&&value.views:value&&value.visits)||0,visitors=Number(value&&value.visitors)||0,viewers=value&&Number.isFinite(Number(value.viewers))?Number(value.viewers):null,stats={views:visits,visits:visits,visitors:visitors};if(viewers!==null)stats.viewers=viewers;siteInteractionStatsCache=stats;window.__htmlServerBlogSiteStats=stats;var scope=root||document;scope.querySelectorAll('[data-blog-site-visits]').forEach(function(node){node.textContent=String(visits);});scope.querySelectorAll('[data-blog-site-visitors]').forEach(function(node){node.textContent=String(visitors);});if(viewers!==null)scope.querySelectorAll('[data-blog-site-viewers]').forEach(function(node){node.textContent=String(viewers);});document.dispatchEvent(new CustomEvent('html-server:blog-site-stats',{detail:{stats:stats}}));return stats;}
  function loadSnapshotSiteStats(root){if(interactionStaticFallback==='disabled')return Promise.reject(new Error('No interaction fallback'));return loadStaticInteractions('views').then(function(payload){if(!payload||!payload.site)throw new Error('Site interaction snapshot unavailable');var local=interactionStaticFallback==='local-overlay'?localStaticViewCounts():{},localVisits=Object.keys(local).reduce(function(total,articlePath){var record=local[articlePath];return total+(typeof record==='number'?record:Number(record&&record.visits)||0);},0);return updateSiteInteractionStats({visits:(Number(payload.site.visits==null?payload.site.views:payload.site.visits)||0)+localVisits,visitors:Number(payload.site.visitors)||0},root);});}
  function loadSiteInteractionStats(root){var scope=root||document;if(!interactionNodes(scope,'[data-blog-site-stats]').length)return Promise.resolve(siteInteractionStatsCache);if(!interactionsEnabled)return Promise.resolve(null);if(staticInteractionFiles&&!remoteInteractionApi)return loadSnapshotSiteStats(root).catch(function(){return null;});return interactionRequest('/api/blog/interactions/site-stats',{headers:{Accept:'application/json'}}).then(function(response){if(!response.ok)throw new Error('Site interaction statistics unavailable');return response.json();}).then(function(payload){return updateSiteInteractionStats(payload.stats||{},root);},function(){return loadSnapshotSiteStats(root).catch(function(){return null;});});}
  function interactionStatsBatches(paths){var batches=[],current=[],length=0;paths.forEach(function(articlePath){var item='path='+encodeURIComponent(articlePath),nextLength=length+(current.length?1:0)+item.length;if(current.length&&(current.length>=100||nextLength>6000)){batches.push(current);current=[];length=0;}current.push(articlePath);length+=(current.length>1?1:0)+item.length;});if(current.length)batches.push(current);return batches;}
  function loadInteractionStats(paths,root){paths=Array.from(new Set(paths.map(normalizeInteractionPath).filter(Boolean)));if(!interactionsEnabled||!paths.length)return Promise.resolve({});if(staticInteractionFiles&&!remoteInteractionApi)return interactionStaticFallback==='disabled'?Promise.resolve({}):loadSnapshotStats(paths,root);return Promise.all(interactionStatsBatches(paths).map(function(batch){var query=batch.map(function(articlePath){return'path='+encodeURIComponent(articlePath);}).join('&');return interactionRequest('/api/blog/interactions/stats?'+query,{headers:{Accept:'application/json'}}).then(function(response){if(!response.ok)throw new Error('Interaction statistics unavailable');return response.json();}).then(function(payload){return payload.stats||{};});})).then(function(parts){var stats=Object.assign.apply(Object,[{}].concat(parts));updateInteractionNodes(stats,root);return stats;},function(){return loadSnapshotStats(paths,root).catch(function(){var stats={};paths.forEach(function(articlePath){stats[articlePath]=interactionStatsCache[articlePath]||{path:articlePath,views:0,visits:0,visitors:0,comments:0};});updateInteractionNodes(stats,root);return stats;});});}
  function recordArticleView(articlePath,root,page){articlePath=normalizeInteractionPath(articlePath);if(!interactionsEnabled||!articlePath||page&&page.dataset.blogVisitRecorded==='true')return Promise.resolve();if(page)page.dataset.blogVisitRecorded='true';var clientView=!!(page&&page.hasAttribute('data-blog-interaction-client-view'));if(!staticInteractionFiles&&!remoteInteractionApi&&!remoteInteractionBackend&&!clientView)return loadInteractionStats([articlePath],root).catch(function(){});if(staticInteractionFiles&&!remoteInteractionApi&&!remoteInteractionBackend){if(interactionStaticFallback==='disabled')return loadInteractionStats([articlePath],root).catch(function(){});if(interactionStaticFallback==='local-overlay'){var localViews=localStaticViewCounts(),current=localViews[articlePath],record=typeof current==='number'?{visits:current,visitor:true}:current||{visits:0,visitor:false};record.visits=(Number(record.visits)||0)+1;record.visitor=true;localViews[articlePath]=record;try{localStorage.setItem('html-server-blog-static-views',JSON.stringify(localViews));}catch(error){}}return loadInteractionStats([articlePath],root).catch(function(){});}return interactionRequest('/api/blog/interactions/views',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({path:articlePath})}).then(function(response){if(!response.ok)throw new Error('Unable to record view');return response.json();}).then(function(payload){var stats={};stats[articlePath]=payload.stats;updateInteractionNodes(stats,root);}).catch(function(){return loadInteractionStats([articlePath],root).catch(function(){});});}
  function hydrateBlogInteractionStats(root){if(!interactionsEnabled)return;var scope=root||document,paths=interactionNodes(scope,'[data-blog-interaction-path]').map(function(node){return node.getAttribute('data-blog-interaction-path');}),record=Promise.resolve(),pagePath='';var page=interactionNodes(scope,'[data-blog-interaction-page],[data-blog-interaction-page-location]')[0];if(page){pagePath=page.hasAttribute('data-blog-interaction-page-location')?(normalizeInteractionPath(location.pathname)||'home'):normalizeInteractionPath(page.getAttribute('data-blog-interaction-page'));record=recordArticleView(pagePath,scope,page);}loadInteractionStats(paths.filter(function(path){return normalizeInteractionPath(path)!==pagePath;}),scope).catch(function(){});record.then(function(){loadSiteInteractionStats(scope).catch(function(){});},function(){loadSiteInteractionStats(scope).catch(function(){});});}
  function loadLatestComments(){var snapshot=function(){return loadStaticInteractions('comments').then(function(payload){return(payload&&payload.comments||[]).slice().sort(function(left,right){return Date.parse(right.created)-Date.parse(left.created);}).slice(0,5);});};if(staticInteractionFiles&&!remoteInteractionApi)return snapshot();return interactionRequest('/api/blog/interactions/comments?latest=5',{headers:{Accept:'application/json'}}).then(function(response){if(!response.ok)throw new Error('Latest comments unavailable');return response.json();}).then(function(payload){return payload.comments||[];},function(error){if(staticInteractionFiles&&interactionStaticFallback!=='disabled')return snapshot();throw error;});}
  function mountLatestBlogComments(root){if(!interactionsEnabled)return;interactionNodes(root,'[data-blog-latest-comments]').forEach(function(host){if(host.dataset.blogLatestMounted==='true')return;host.dataset.blogLatestMounted='true';var itemTemplate=host.querySelector('template[data-blog-latest-comment-template]'),emptyTemplate=host.querySelector('template[data-blog-latest-comment-empty-template]'),errorTemplate=host.querySelector('template[data-blog-latest-comment-error-template]');if(!itemTemplate)return;if(staticInteractionFiles&&!remoteInteractionApi&&interactionStaticFallback==='disabled'){host.hidden=true;return;}loadLatestComments().then(function(comments){host.replaceChildren();comments.forEach(function(comment){var fragment=itemTemplate.content.cloneNode(true),avatar=fragment.querySelector('[data-blog-latest-comment-avatar]'),link=fragment.querySelector('[data-blog-latest-comment-link]'),nick=fragment.querySelector('[data-blog-latest-comment-nick]'),time=fragment.querySelector('[data-blog-latest-comment-time]');if(!avatar||!link||!nick||!time)return;avatar.textContent=String(comment.nick||'访客').slice(0,1);link.href=siteUrl(articleRoute(comment.path))+'#post-comment';link.title=comment.content;link.textContent=comment.content;nick.textContent=(comment.nick||'访客')+' / ';time.dateTime=comment.created;time.textContent=new Date(comment.created).toLocaleDateString();host.append(fragment);});if(!comments.length&&emptyTemplate)host.append(emptyTemplate.content.cloneNode(true));},function(){host.replaceChildren();if(errorTemplate)host.append(errorTemplate.content.cloneNode(true));});});}
  var turnstileLoader;
  function mountInteractionTurnstile(form){var siteKey=String(interactionPluginConfig.turnstileSiteKey||'');if(!remoteInteractionApi||!siteKey||form.querySelector('[data-blog-turnstile]'))return;var host=document.createElement('div');host.setAttribute('data-blog-turnstile','');host.className='html-server-blog-turnstile';form.setAttribute('data-blog-turnstile-mounted','');var actions=form.querySelector('[data-blog-comment-actions]');(actions||form).before(host);function render(){if(window.turnstile&&!host.dataset.turnstileWidgetId){var compact=host.getBoundingClientRect().width<300;host.dataset.turnstileWidgetId=String(window.turnstile.render(host,{sitekey:siteKey,size:compact?'compact':'flexible',theme:'auto'}));}}if(window.turnstile){render();return;}if(!turnstileLoader){turnstileLoader=new Promise(function(resolve,reject){var script=document.createElement('script');script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';script.async=true;script.defer=true;script.onload=resolve;script.onerror=reject;document.head.append(script);});}turnstileLoader.then(render,function(){});}
  function mountBlogComments(root){if(!interactionsEnabled)return;interactionNodes(root,'[data-blog-comments]').forEach(function(commentRoot){if(commentRoot.dataset.blogCommentsMounted==='true')return;commentRoot.dataset.blogCommentsMounted='true';if(staticInteractionFiles&&!remoteInteractionApi&&interactionStaticFallback==='disabled'){commentRoot.hidden=true;return;}
    var form=commentRoot.querySelector('[data-blog-comment-form]'),textarea=form&&form.querySelector('textarea[name=comment]'),counter=form&&form.querySelector('[data-blog-comment-count]'),items=commentRoot.querySelector('[data-blog-comment-items]'),total=commentRoot.querySelector('[data-blog-comments-total]'),replying=form&&form.querySelector('[data-blog-comment-replying]'),cancelReply=form&&form.querySelector('[data-blog-comment-cancel]'),login=form&&form.querySelector('[data-blog-comment-login]'),emoji=form&&form.querySelector('[data-blog-comment-emoji]'),emojiPanel=form&&form.querySelector('[data-blog-comment-emoji-panel]'),preview=form&&form.querySelector('[data-blog-comment-preview]'),previewPanel=form&&form.querySelector('[data-blog-comment-preview-panel]'),validation=form&&form.querySelector('[data-blog-comment-validation]'),validationMessage=validation&&validation.querySelector('[data-blog-comment-validation-message]'),sortControls=Array.from(commentRoot.querySelectorAll('[data-blog-comment-sort]')),itemTemplate=commentRoot.querySelector('template[data-blog-comment-item-template]'),emptyTemplate=commentRoot.querySelector('template[data-blog-comment-empty-template]');if(!form||!textarea||!items||!itemTemplate)return;mountInteractionTurnstile(form);
    var replyParent='',activeSort=sortControls.find(function(control){return control.classList.contains('active');})||sortControls[0],commentSort=activeSort&&activeSort.getAttribute('data-blog-comment-sort')||'oldest',commentPath=normalizeInteractionPath(commentRoot.getAttribute('data-blog-comment-path')||location.pathname),storageKey='html-server-blog-comments:'+commentPath,comments=[],localComments=[],commentsWritable=remoteInteractionApi||(!remoteInteractionBackend&&!staticInteractionFiles),allowLocalWrites=interactionStaticFallback==='local-overlay';try{localComments=allowLocalWrites?JSON.parse(localStorage.getItem(storageKey)||'[]'):[];if(!Array.isArray(localComments))localComments=[];if(!localComments.length&&allowLocalWrites){var legacy=JSON.parse(localStorage.getItem('html-server-akilar-comments:'+commentPath)||'[]');if(Array.isArray(legacy))localComments=legacy;}}catch(error){localComments=[];}
    function saveLocalComments(){try{localStorage.setItem(storageKey,JSON.stringify(localComments));}catch(error){}}
    function snapshotComments(){return loadStaticInteractions('comments').then(function(payload){return(payload&&payload.comments||[]).filter(function(comment){return normalizeInteractionPath(comment.path)===commentPath;});});}
    function loadComments(){var request=staticInteractionFiles&&!remoteInteractionApi?snapshotComments():interactionRequest('/api/blog/interactions/comments?path='+encodeURIComponent(commentPath),{headers:{Accept:'application/json'}}).then(function(response){if(!response.ok)throw new Error('Comments unavailable');return response.json();}).then(function(payload){return Array.isArray(payload.comments)?payload.comments:[];});return request.catch(function(error){commentsWritable=false;if(staticInteractionFiles&&interactionStaticFallback!=='disabled')return snapshotComments();throw error;}).then(function(values){comments=uniqueComments(values.concat(localComments));renderComments();},function(){commentsWritable=false;if(interactionStaticFallback==='disabled')commentRoot.hidden=true;comments=uniqueComments(localComments);renderComments();});}
    function padCommentTime(value){var text=String(value);return text.length<2?'0'+text:text;}
    function formatValineCommentTime(value){var created=new Date(value),difference=Date.now()-created.getTime();if(!value||Number.isNaN(created.getTime()))return'';var days=Math.floor(difference/86400000);if(days===0){var dayRemainder=difference%86400000,hours=Math.floor(dayRemainder/3600000);if(hours===0){var hourRemainder=dayRemainder%3600000,minutes=Math.floor(hourRemainder/60000);if(minutes===0)return Math.round(hourRemainder%60000/1000)+' 秒前';return minutes+' 分钟前';}return hours+' 小时前';}if(days<0)return'刚刚';if(days<8)return days+' 天前';return created.getFullYear()+'-'+padCommentTime(created.getMonth()+1)+'-'+padCommentTime(created.getDate());}
    function formatCommentTime(value,meta){return meta.getAttribute('data-blog-comment-time-format')==='valine-1.4.4'?formatValineCommentTime(value):new Date(value).toLocaleString();}
    function fillCommentAvatar(avatar,comment){avatar.replaceChildren();if(comment.avatar){var image=document.createElement('img');image.src=comment.avatar;image.alt='';image.loading='lazy';avatar.append(image);}else{var dot=document.createElement('i');avatar.append(dot);}}
    function fillCommentEnvironment(info,comment){var environment=comment.environment||{},parts=[],location=[environment.region,environment.city].filter(Boolean).join(' '),os=[environment.osName,environment.osVersion].filter(Boolean).join(' '),browser=[environment.browserName,environment.browserVersion].filter(Boolean).join(' ');if(location)parts.push(['location','⌖',location]);if(os)parts.push(['os','▣',os]);if(browser)parts.push(['browser','◉',browser]);if(environment.deviceType&&environment.deviceType!=='desktop')parts.push(['device','▱',[environment.deviceVendor,environment.deviceModel,environment.deviceType].filter(Boolean).join(' ')]);info.replaceChildren();parts.forEach(function(part){var item=document.createElement('span');item.className='comment-extra-'+part[0];item.dataset.icon=part[1];item.textContent=part[2];info.append(item);});}
    function toggleCommentLike(comment,button){if(button.disabled)return;button.disabled=true;var localOnly=staticInteractionFiles&&!remoteInteractionApi;if(localOnly){var key='html-server-comment-likes',liked=[];try{liked=JSON.parse(localStorage.getItem(key)||'[]')||[];}catch(error){}var active=liked.includes(comment.id);liked=active?liked.filter(function(id){return id!==comment.id;}):liked.concat(comment.id);try{localStorage.setItem(key,JSON.stringify(liked));}catch(error){}comment.liked=!active;comment.likes=Math.max(0,Number(comment.likes)||0)+(active?-1:1);renderComments();return;}interactionRequest('/api/blog/interactions/comments/'+encodeURIComponent(comment.id)+'/like',{method:'POST',headers:{Accept:'application/json'}}).then(function(response){if(!response.ok)throw new Error('点赞失败');return response.json();}).then(function(payload){comment.likes=Number(payload.likes)||0;comment.liked=!!payload.liked;renderComments();},function(){button.disabled=false;});}
    function commentTimestamp(comment){var value=Date.parse(comment.created||'');return Number.isFinite(value)?value:0;}
    function compareComments(left,right){if(commentSort==='popular'){var likes=(Number(right.likes)||0)-(Number(left.likes)||0);if(likes)return likes;}var order=commentTimestamp(left)-commentTimestamp(right);return commentSort==='latest'?-order:order;}
    function commentChildren(parentId){return comments.filter(function(candidate){return candidate.parentId===parentId;}).slice().sort(compareComments);}
    function rootComments(){return comments.filter(function(comment){return !comment.parentId||!comments.some(function(candidate){return candidate.id===comment.parentId;});}).slice().sort(compareComments);}
    function renderComment(comment,depth){var fragment=itemTemplate.content.cloneNode(true),node=fragment.querySelector('[data-blog-comment-item]'),avatar=fragment.querySelector('[data-blog-comment-avatar]'),nick=fragment.querySelector('[data-blog-comment-nick]'),meta=fragment.querySelector('[data-blog-comment-meta]'),like=fragment.querySelector('[data-blog-comment-like]'),reply=fragment.querySelector('[data-blog-comment-reply]'),content=fragment.querySelector('[data-blog-comment-content]'),extras=fragment.querySelector('[data-blog-comment-extras]'),children=fragment.querySelector('[data-blog-comment-replies]');if(!node||!avatar||!nick||!meta||!like||!reply||!content||!extras||!children)return fragment;node.dataset.commentId=comment.id;node.classList.toggle('is-reply',depth>0);fillCommentAvatar(avatar,comment);var nickNode=nick;if(comment.website&&nick.tagName!=='A'){nickNode=document.createElement('a');Array.from(nick.attributes).forEach(function(attribute){nickNode.setAttribute(attribute.name,attribute.value);});nick.replaceWith(nickNode);}nickNode.textContent=comment.nick||'访客';if(comment.website){nickNode.href=comment.website;nickNode.target='_blank';nickNode.rel='noopener noreferrer';}meta.textContent=formatCommentTime(comment.created,meta);like.classList.toggle('is-liked',!!comment.liked);like.setAttribute('aria-pressed',String(!!comment.liked));like.textContent=String(Number(comment.likes)||0);like.addEventListener('click',function(){toggleCommentLike(comment,like);});reply.addEventListener('click',function(){replyParent=comment.id;if(replying){replying.hidden=false;replying.textContent='回复 @'+comment.nick;}if(cancelReply)cancelReply.hidden=false;textarea.placeholder='回复 @'+comment.nick;textarea.focus();var top=window.scrollY+form.getBoundingClientRect().top-70;window.scrollTo({top:top,behavior:'smooth'});});content.innerHTML=renderPreviewMarkdown(comment.content);fillCommentEnvironment(extras,comment);commentChildren(comment.id).forEach(function(child){children.append(renderComment(child,depth+1));});if(!children.childElementCount)children.remove();return fragment;}
    function renderComments(){items.replaceChildren();rootComments().forEach(function(comment){items.append(renderComment(comment,0));});if(total){total.textContent=comments.length===0&&total.hasAttribute('data-blog-comments-zero-empty')?'':String(comments.length);var totalContainer=total.closest('[data-blog-comment-count-container]');if(totalContainer)totalContainer.hidden=comments.length===0;}items.classList.toggle('is-empty',comments.length===0);if(!comments.length&&emptyTemplate)items.append(emptyTemplate.content.cloneNode(true));var current=interactionStatsCache[commentPath]||{},visits=Number(current.visits==null?current.views:current.visits)||0,stats={};stats[commentPath]={path:commentPath,views:visits,visits:visits,visitors:Number(current.visitors)||0,comments:comments.length};updateInteractionNodes(stats,document);}
    function resetReply(){replyParent='';if(replying){replying.hidden=true;replying.textContent='';}if(cancelReply)cancelReply.hidden=true;textarea.placeholder=textarea.getAttribute('data-blog-comment-default-placeholder')||'';}
    function renderPreviewMarkdown(value){if(!String(value||'').trim())return'<p class="is-empty">暂无预览内容</p>';return commentMarkdownParser?commentMarkdownParser.render(expandCommentEmotionCodes(value)):'<p class="is-loading">Markdown 预览加载中…</p>';}
    function syncPreview(){if(previewPanel)previewPanel.innerHTML=renderPreviewMarkdown(textarea.value);}
    textarea.addEventListener('input',function(){if(counter)counter.textContent=String(textarea.value.length);syncPreview();});if(cancelReply)cancelReply.addEventListener('click',resetReply);if(login)login.addEventListener('click',function(){var nick=form.querySelector('input[name=nick]');if(nick)nick.focus();});
    function insertCommentValue(value){var start=textarea.selectionStart||textarea.value.length,end=textarea.selectionEnd||start;textarea.value=textarea.value.slice(0,start)+value+textarea.value.slice(end);textarea.selectionStart=textarea.selectionEnd=start+value.length;textarea.dispatchEvent(new Event('input'));emojiPanel.hidden=true;emoji.classList.remove('actived');emoji.setAttribute('aria-expanded','false');textarea.focus();}
    function mountCommentEmotionPackages(payload){emojiPanel.replaceChildren();emojiPanel.classList.add('html-server-comment-emotion-panel');var itemsHost=document.createElement('div'),tabs=document.createElement('div'),packages=payload.packages||[];itemsHost.className='html-server-comment-emotion-items wl-tab-wrapper';tabs.className='html-server-comment-emotion-tabs wl-tabs';packages.forEach(function(packageData,index){var name=packageData.name||'',list=document.createElement('div'),tab=document.createElement('button');list.className='html-server-comment-emotion-package';list.hidden=index!==0;tab.type='button';tab.textContent=name;tab.className='wl-tab'+(index===0?' is-active active':'');tab.addEventListener('click',function(event){event.preventDefault();event.stopPropagation();itemsHost.querySelectorAll('.html-server-comment-emotion-package').forEach(function(node){node.hidden=true;});tabs.querySelectorAll('button').forEach(function(node){node.classList.remove('is-active','active');});list.hidden=false;tab.classList.add('is-active','active');});(packageData.items||[]).forEach(function(item){var button=document.createElement('button'),image=document.createElement('img');if(!item.token||!item.file)return;button.type='button';button.title=item.token;button.setAttribute('aria-label','插入 '+item.token);image.src=commentEmotionUrl(item.file);image.alt=item.token;image.loading='lazy';button.append(image);button.addEventListener('click',function(){insertCommentValue(':'+item.token+':');});list.append(button);});itemsHost.append(list);tabs.append(tab);});emojiPanel.append(itemsHost,tabs);}
    if(emoji&&emojiPanel){['🍬','😀','😄','🥳','❤️','👍','🎉','✨','🌸','♦'].forEach(function(value){var button=document.createElement('button');button.type='button';button.textContent=value;button.setAttribute('aria-label','插入 '+value);button.addEventListener('click',function(){insertCommentValue(value);});emojiPanel.append(button);});loadCommentEmotions().then(function(payload){mountCommentEmotionPackages(payload);syncPreview();renderComments();},function(){});}
    function closeCommentEmotionOnOutside(event){if(!form.isConnected){document.removeEventListener('click',closeCommentEmotionOnOutside,true);return;}if(!emoji||!emojiPanel||emojiPanel.hidden)return;var target=event.target;if(emoji.contains(target)||emojiPanel.contains(target))return;emojiPanel.hidden=true;emoji.classList.remove('actived');emoji.setAttribute('aria-expanded','false');}
    if(emoji&&emojiPanel)document.addEventListener('click',closeCommentEmotionOnOutside,true);
    sortControls.forEach(function(control){function activate(){commentSort=control.getAttribute('data-blog-comment-sort')||'oldest';sortControls.forEach(function(item){item.classList.toggle('active',item===control);});renderComments();}control.addEventListener('click',activate);control.addEventListener('keydown',function(event){if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}});});
    form.addEventListener('click',function(event){var control=event.target.closest&&event.target.closest('[data-blog-comment-emoji],[data-blog-comment-preview]');if(!control)return;event.preventDefault();event.stopImmediatePropagation();if(control.hasAttribute('data-blog-comment-emoji')&&emojiPanel){var emojiOpen=emojiPanel.hidden;emojiPanel.hidden=!emojiOpen;emoji.classList.toggle('actived',emojiOpen);emoji.setAttribute('aria-expanded',String(emojiOpen));if(emojiOpen&&previewPanel&&preview){previewPanel.hidden=true;previewPanel.innerHTML='';preview.classList.remove('actived');preview.setAttribute('aria-pressed','false');}return;}if(control.hasAttribute('data-blog-comment-preview')&&previewPanel){var open=previewPanel.hidden;previewPanel.hidden=!open;var editor=textarea.closest('[data-blog-comment-editor]'),replace=commentRoot.getAttribute('data-blog-comment-preview-mode')==='replace';if(open&&emojiPanel&&emoji){emojiPanel.hidden=true;emoji.classList.remove('actived');emoji.setAttribute('aria-expanded','false');}if(replace&&editor)editor.hidden=open;preview.classList.toggle('actived',open);preview.setAttribute('aria-pressed',String(open));if(replace)preview.textContent=open?'编辑':'预览';if(open)syncPreview();else previewPanel.innerHTML='';}},true);
    var validationField=null,customValidation=form.hasAttribute('data-blog-comment-custom-validation');
    function hideCommentValidation(){if(!validation)return;validation.hidden=true;if(validationField)validationField.removeAttribute('aria-invalid');validationField=null;}
    function commentValidationMessage(field){var value=String(field.value||'').trim();if(field.required&&!value){if(field.name==='nick')return'请填写昵称。';if(field.name==='comment')return'请填写评论内容。';return'请填写此字段。';}if(field.validity&&field.validity.typeMismatch){if(field.name==='email')return'请输入有效的邮箱地址。';if(field.name==='website')return'请输入以 http:// 或 https:// 开头的网址。';}if(field.validity&&field.validity.tooLong)return'输入内容超过长度限制。';return field.validationMessage||'请检查此字段。';}
    function firstInvalidCommentField(){var fields=form.querySelectorAll('input,textarea');for(var index=0;index<fields.length;index+=1){var field=fields[index],emptyRequired=field.required&&!String(field.value||'').trim();if(emptyRequired||field.validity&&!field.validity.valid)return field;}return null;}
    function showCommentValidation(field){if(!validation||!validationMessage)return;hideCommentValidation();validationField=field;validationMessage.textContent=commentValidationMessage(field);field.setAttribute('aria-invalid','true');var formRect=form.getBoundingClientRect(),fieldRect=field.getBoundingClientRect(),left=Math.max(18,Math.min(formRect.width-18,fieldRect.left-formRect.left+fieldRect.width/2)),top=fieldRect.bottom-formRect.top+8;validation.style.setProperty('--comment-validation-left',left+'px');validation.style.setProperty('--comment-validation-top',top+'px');validation.hidden=false;field.focus({preventScroll:true});field.scrollIntoView({block:'nearest',behavior:'smooth'});}
    if(customValidation){form.addEventListener('invalid',function(event){event.preventDefault();},true);form.addEventListener('input',function(event){if(event.target===validationField)hideCommentValidation();});form.addEventListener('change',function(event){if(event.target===validationField)hideCommentValidation();});}
    form.addEventListener('submit',function(event){event.preventDefault();if(customValidation){var invalidField=firstInvalidCommentField();if(invalidField){showCommentValidation(invalidField);return;}}else if(!form.reportValidity())return;hideCommentValidation();var data=new FormData(form),now=new Date().toISOString(),draft={id:String(Date.now())+'-'+Math.random().toString(36).slice(2,8),path:commentPath,parentId:replyParent,nick:String(data.get('nick')||'').trim(),email:String(data.get('email')||'').trim(),website:String(data.get('website')||'').trim(),content:String(data.get('comment')||'').trim(),avatar:'',likes:0,liked:false,environment:commentClientEnvironment(),created:now,updated:now,turnstileToken:String(data.get('cf-turnstile-response')||'')};if(!draft.nick||!draft.content)return;var localOnly=!commentsWritable&&allowLocalWrites;if(!commentsWritable&&!localOnly){var denied=new Error('当前评论后端只读');denied.name='ReadOnly';return Promise.reject(denied).catch(showCommentError);}var submit=localOnly?Promise.resolve(draft):interactionRequest('/api/blog/interactions/comments',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(draft)}).then(function(response){if(!response.ok)return response.json().catch(function(){return{};}).then(function(payload){throw new Error(payload.error||'评论发送失败');});return response.json();}).then(function(payload){return payload.comment;});submit.then(function(saved){if(localOnly){localComments.push(saved);saveLocalComments();}comments=uniqueComments(comments.concat(saved));textarea.value='';if(counter)counter.textContent='0';resetReply();if(!localOnly&&window.turnstile){var turnstileHost=form.querySelector('[data-blog-turnstile]'),widgetId=turnstileHost&&turnstileHost.dataset.turnstileWidgetId;if(widgetId)window.turnstile.reset(widgetId);}renderComments();},showCommentError);});
    function showCommentError(error){hideCommentValidation();var errorNode=form.querySelector('[data-blog-comment-error]');if(!errorNode){errorNode=document.createElement('span');errorNode.setAttribute('data-blog-comment-error','');form.append(errorNode);}errorNode.hidden=false;errorNode.textContent=error.message||'评论发送失败';}
    renderComments();Promise.all([loadCommentMarkdown(),loadCommentEmotions()]).then(function(){syncPreview();loadComments();},function(){loadComments();});
  });}
  mountBlogComments(document);mountLatestBlogComments(document);hydrateBlogInteractionStats(document);hydratePresence();
  document.addEventListener('html-server:after-page-mount',function(event){var root=event.detail&&event.detail.main||document;mountBlogComments(root);mountLatestBlogComments(root);hydrateBlogInteractionStats(root);hydratePresence();});
  document.addEventListener('visibilitychange',function(){if(document.hidden){if(presenceHiddenTimer)clearTimeout(presenceHiddenTimer);presenceHiddenTimer=setTimeout(function(){presenceHiddenTimer=0;if(document.hidden)closePresence('background');},60000);}else{if(presenceHiddenTimer){clearTimeout(presenceHiddenTimer);presenceHiddenTimer=0;}hydratePresence();}});
  window.addEventListener('pagehide',function(){closePresence('pagehide');});
  var interactionHydrateSelector='[data-blog-interaction-path],[data-blog-interaction-page],[data-blog-interaction-page-location],[data-blog-site-stats],[data-blog-presence-site],[data-blog-presence-page],[data-blog-comments]';
  var interactionHydrateTimer=0,interactionObserver=new MutationObserver(function(records){if(!records.some(function(record){return Array.from(record.addedNodes).some(function(node){return node.nodeType===1&&(node.matches&&node.matches(interactionHydrateSelector)||node.querySelector&&node.querySelector(interactionHydrateSelector));});}))return;clearTimeout(interactionHydrateTimer);interactionHydrateTimer=setTimeout(function(){mountBlogComments(document);hydrateBlogInteractionStats(document);hydratePresence();},30);});interactionObserver.observe(document.documentElement,{childList:true,subtree:true});

(function(){
  var root=document.querySelector('[data-blog-music-player]');
  var config=(window.__htmlServerPlugins&&window.__htmlServerPlugins['blog-music-player'])||{};
  if(!root||config.enabled===false||root.dataset.musicMounted==='true')return;
  var audio=root.querySelector('audio');if(!audio)return;
  root.dataset.musicMounted='true';
  // Hint the browser to open the TCP+TLS connection to the audio CDN up
  // front, so the first track and every cross-track request skips the
  // ~150ms handshake. The proxy redirects to *.music.126.net for netease.
  (function(){
    var hosts=['https://music.126.net'];
    for(var i=0;i<hosts.length;i++){
      var link=document.createElement('link');
      link.rel='preconnect';
      link.href=hosts[i];
      link.crossOrigin='anonymous';
      document.head.appendChild(link);
    }
  })();
  // Hidden audio element for pre-fetching the next track so the gap between
  // songs is essentially zero. Created once, then assigned the next track's
  // URL as soon as the current track starts playing. When the current track
  // ends, the two audio elements swap roles.
  var preloadAudio=document.createElement('audio');
  preloadAudio.preload='auto';
  preloadAudio.setAttribute('aria-hidden','true');
  preloadAudio.style.display='none';
  root.appendChild(preloadAudio);
  var preloadIndex=-1;
  var preloadUrl='';
  var preloadReady=false;
  preloadAudio.addEventListener('canplaythrough',function(){if(preloadAudio===document.activeElement)return;preloadReady=true;});
  preloadAudio.addEventListener('error',function(){preloadReady=false;preloadUrl='';preloadIndex=-1;});
  var one=function(selector){return root.querySelector(selector);},many=function(selector){return Array.prototype.slice.call(root.querySelectorAll(selector));};
  var cover=one('[data-music-cover]'),title=one('[data-music-title]'),author=one('[data-music-author]'),prev=one('[data-music-prev]'),next=one('[data-music-next]'),narrow=one('[data-music-narrow]'),list=one('[data-music-list]'),listItems=one('[data-music-list-items]'),listTemplate=one('[data-music-list-item-template]'),progress=one('[data-music-progress]'),loaded=one('[data-music-loaded]'),played=one('[data-music-played]'),volumeBar=one('[data-music-volume]'),volumeFill=one('[data-music-volume-level]'),volumeToggle=one('[data-music-volume-toggle]'),orderButton=one('[data-music-order]'),loopButton=one('[data-music-loop]'),lrcToggle=one('[data-music-lrc-toggle]'),lrc=one('[data-music-lrc]'),lrcContents=one('[data-music-lrc-contents]'),currentTimeNode=one('[data-music-current-time]'),durationNode=one('[data-music-duration]'),notice=one('[data-music-notice]'),playButtons=many('[data-music-play]'),menuButtons=many('[data-music-menu]');
  var tracks=[],index=0,failed=0,autoplayWaiting=false,lrcLines=[],lrcTimed=true,lrcRequest=0,lrcController=null,lrcVisiblePreference=true,lastVolume=.7,loadGeneration=0,handledFailure=-1,metadataTimer=null;
  var orderMode=config.order==='list'?'list':'random',loopMode=['all','one','none'].indexOf(config.loop)>=0?config.loop:'all';
  var storageName=typeof config.storageName==='string'&&config.storageName?config.storageName:'metingjs';
  var clamp=function(value,min,max){return Math.max(min,Math.min(max,value));};
  var numberSetting=function(value,fallback,min,max){value=Number(value);return Number.isFinite(value)?clamp(value,min,max):fallback;};
  var safeCssValue=function(value,fallback){value=String(value||'').trim().slice(0,120);return value&&!/[;{}]/.test(value)&&!/url\s*\(/i.test(value)?value:fallback;};
  var lyricPositions=['bottom-center','bottom-left','bottom-right','top-center','top-left','top-right'],lyricPosition=lyricPositions.indexOf(config.lyricsPosition)>=0?config.lyricsPosition:'bottom-center';
  var lyricOffsetX=numberSetting(config.lyricsOffsetX,0,-2000,2000),lyricOffsetY=numberSetting(config.lyricsOffsetY,0,-2000,2000),lyricMaxWidth=numberSetting(config.lyricsMaxWidth,0,0,3000),lyricFontSize=numberSetting(config.lyricsFontSize,12,8,72),lyricLineHeight=numberSetting(config.lyricsLineHeight,16,8,120),lyricVisibleLines=Math.round(numberSetting(config.lyricsVisibleLines,2,1,12)),lyricInactiveOpacity=numberSetting(config.lyricsInactiveOpacity,.4,0,1),lyricStep=Math.max(lyricFontSize,lyricLineHeight);
  var lyricFontMode=['player','system','serif','monospace','custom'].indexOf(config.lyricsFontFamily)>=0?config.lyricsFontFamily:'player',lyricFonts={player:'Arial,Helvetica,sans-serif',system:'system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',serif:'Georgia,"Times New Roman",serif',monospace:'SFMono-Regular,Consolas,"Liberation Mono",monospace'};
  var lyricFontFamily=lyricFontMode==='custom'?safeCssValue(config.lyricsCustomFontFamily,lyricFonts.player):lyricFonts[lyricFontMode],lyricFontWeight=['normal','500','600','bold'].indexOf(String(config.lyricsFontWeight))>=0?String(config.lyricsFontWeight):'normal';
  root.dataset.musicLrcPosition=lyricPosition;root.dataset.musicLrcConstrained=String(lyricMaxWidth>0);root.dataset.musicLrcVisibleLines=String(lyricVisibleLines);
  root.style.setProperty('--music-lyrics-offset-x',lyricOffsetX+'px');root.style.setProperty('--music-lyrics-offset-y',lyricOffsetY+'px');root.style.setProperty('--music-lyrics-max-width',(lyricMaxWidth||0)+'px');root.style.setProperty('--music-lyrics-font-family',lyricFontFamily);root.style.setProperty('--music-lyrics-font-size',lyricFontSize+'px');root.style.setProperty('--music-lyrics-line-height',lyricLineHeight+'px');root.style.setProperty('--music-lyrics-effective-line-height',lyricStep+'px');root.style.setProperty('--music-lyrics-visible-lines',String(lyricVisibleLines));root.style.setProperty('--music-lyrics-height',(lyricStep*lyricVisibleLines)+'px');root.style.setProperty('--music-lyrics-font-weight',lyricFontWeight);root.style.setProperty('--music-lyrics-color',safeCssValue(config.lyricsColor,'#666666'));root.style.setProperty('--music-lyrics-current-color',safeCssValue(config.lyricsCurrentColor,'#666666'));root.style.setProperty('--music-lyrics-inactive-opacity',String(lyricInactiveOpacity));
  var text=function(node,value){if(node)node.textContent=value||'';};
  var time=function(value){if(!Number.isFinite(value)||value<0)return'00:00';var minute=Math.floor(value/60),second=Math.floor(value-minute*60);return(minute<10?'0':'')+minute+':'+(second<10?'0':'')+second;};
  var readStoredVolume=function(fallback){try{var saved=JSON.parse(localStorage.getItem(storageName)||'{}');var value=Number(saved.volume);return Number.isFinite(value)?clamp(value,0,1):fallback;}catch(_){return fallback;}};
  var storeVolume=function(value){try{var saved=JSON.parse(localStorage.getItem(storageName)||'{}');saved.volume=value;localStorage.setItem(storageName,JSON.stringify(saved));}catch(_){}};
  var configuredVolume=Number(config.volume);if(!Number.isFinite(configuredVolume))configuredVolume=.7;configuredVolume=clamp(configuredVolume,0,1);audio.volume=readStoredVolume(configuredVolume);if(audio.volume>0)lastVolume=audio.volume;
  audio.preload=['auto','metadata','none'].indexOf(config.preload)>=0?config.preload:'auto';
  root.dataset.musicOrderState=orderMode;root.dataset.musicLoopState=loopMode;
  var updateVolume=function(){if(volumeFill)volumeFill.style.height=(audio.volume*100)+'%';if(volumeToggle)volumeToggle.setAttribute('aria-label',audio.volume?'静音':'取消静音');};updateVolume();
  var notify=function(message){text(notice,message);if(notice){notice.hidden=false;clearTimeout(notice._timer);notice._timer=setTimeout(function(){notice.hidden=true;},2600);}};
  var lyricSource=function(item){var value=item.lrc||item.lyric||item.lyrics||item.lrcUrl||item.lyricUrl||'';if(value&&typeof value==='object')value=value.lyric||value.lrc||value.text||value.url||'';return typeof value==='string'?value:'';};
  var normalize=function(data){var source=Array.isArray(data)?data:Array.isArray(data&&data.audio)?data.audio:Array.isArray(data&&data.data)?data.data:[];return source.map(function(item){return{name:item.name||item.title||'Audio name',artist:item.artist||item.author||item.artists||'Audio artist',url:item.url||item.src||'',cover:item.cover||item.pic||item.image||'',lrc:lyricSource(item),theme:item.theme||'#2980b9',preview:!!item.preview,approxSeconds:Number(item.approxSeconds)||0};}).filter(function(item){return item.url;});};
  var createListItem=function(){var row=listTemplate&&listTemplate.content&&listTemplate.content.firstElementChild?listTemplate.content.firstElementChild.cloneNode(true):null;if(row)return row;row=document.createElement('button');row.type='button';row.dataset.musicListItem='';row.innerHTML='<span data-music-list-index></span><span data-music-list-title></span><span data-music-list-author></span>';return row;};
  var renderList=function(){if(!listItems)return;listItems.replaceChildren();tracks.forEach(function(track,i){var row=createListItem();row.dataset.musicListItem='';row.dataset.index=String(i);text(row.querySelector('[data-music-list-index]'),String(i+1));text(row.querySelector('[data-music-list-title]'),track.name);text(row.querySelector('[data-music-list-author]'),track.artist);var select=function(){if(i!==index){load(i,true);setListOpen(false);}else{togglePlay();}};row.addEventListener('click',select);row.addEventListener('keydown',function(event){if(event.key==='Enter'||event.key===' '){event.preventDefault();select();}});listItems.appendChild(row);});};
  var parseLrc=function(source){var value=String(source||'').replace(/^\ufeff/,''),lines=[],offsetMatch=value.match(/\[offset:([+-]?\d+)\]/i),offset=offsetMatch?Number(offsetMatch[1])/1000:0;value.split(/\r?\n/).forEach(function(line){var matches=line.match(/\[(\d{1,3}):(\d{1,2})(?:[.:](\d{1,3}))?\]/g);if(!matches)return;var lyric=line.replace(/\[[^\]]+\]/g,'').trim();matches.forEach(function(tag){var parts=tag.slice(1,-1).split(/[:.]/),fraction=parts[2]||'0';lines.push({time:Math.max(0,Number(parts[0])*60+Number(parts[1])+Number('0.'+fraction)+offset),text:lyric||' '});});});if(lines.length)return{lines:lines.sort(function(a,b){return a.time-b.time;}),timed:true};var plain=value.split(/\r?\n/).map(function(line){return line.trim();}).filter(function(line){return line&&!/^\[(?:ti|ar|al|by|offset|re|ve):/i.test(line);});return{lines:plain.map(function(text){return{time:0,text:text};}),timed:false};};
  var syncLrcVisibility=function(){var has=root.dataset.musicHasLrc==='true',visible=has&&lrcVisiblePreference,timing=root.dataset.musicLrcTiming||'none';root.dataset.musicLrcVisible=String(visible);if(lrc)lrc.setAttribute('aria-hidden',String(!visible));if(lrcToggle){lrcToggle.dataset.musicLrcTiming=timing;lrcToggle.setAttribute('aria-pressed',String(visible));lrcToggle.setAttribute('aria-disabled',String(!has&&root.dataset.musicLrcState!=='loading'));lrcToggle.setAttribute('title',timing==='estimated'?'歌词源无时间戳，当前行按播放进度估算':'歌词');}};
  var updateLrc=function(){if(!lrcLines.length||!lrcContents)return;var active=0,i;if(lrcTimed){for(i=0;i<lrcLines.length;i++){if(audio.currentTime>=lrcLines[i].time)active=i;else break;}}else if(Number.isFinite(audio.duration)&&audio.duration>0){active=Math.min(lrcLines.length-1,Math.floor(clamp(audio.currentTime/audio.duration,0,.999999)*lrcLines.length));}else{active=Math.min(lrcLines.length-1,Math.floor(Math.max(0,audio.currentTime)/5));}var preferredSlot=Math.floor((lyricVisibleLines-1)/2),maxStart=Math.max(0,lrcLines.length-lyricVisibleLines),windowStart=Math.min(maxStart,Math.max(0,active-preferredSlot));many('[data-music-lrc-line]').forEach(function(node,lineIndex){if(lineIndex===active)node.dataset.musicLrcCurrent='true';else delete node.dataset.musicLrcCurrent;});root.dataset.musicLrcWindowStart=String(windowStart);lrcContents.style.transform='translateY('+(-lyricStep*windowStart)+'px)';};
  var syncPlayback=function(){text(currentTimeNode,time(audio.currentTime));text(durationNode,time(audio.duration));if(played)played.style.width=Number.isFinite(audio.duration)&&audio.duration>0?(clamp(audio.currentTime/audio.duration,0,1)*100)+'%':'0%';updateLrc();};
  var showLrc=function(source,request){if(request!==undefined&&request!==lrcRequest)return;var parsed=parseLrc(source);lrcLines=parsed.lines;lrcTimed=parsed.timed;if(lrcContents){lrcContents.replaceChildren();lrcLines.forEach(function(line){var p=document.createElement('p');p.dataset.musicLrcLine='';p.textContent=line.text;lrcContents.appendChild(p);});}root.dataset.musicHasLrc=String(lrcLines.length>0);root.dataset.musicLrcState=lrcLines.length?'ready':'empty';root.dataset.musicLrcTiming=lrcLines.length?(lrcTimed?'timed':'estimated'):'none';syncLrcVisibility();syncPlayback();};
  var loadLrc=function(value){var request=++lrcRequest,source=String(value||'').trim();if(lrcController){lrcController.abort();lrcController=null;}showLrc('',request);if(!source)return;var remote=/^(?:https?:)?\/\//i.test(source)||source.charAt(0)==='/'||/^\.{1,2}\//.test(source)||/^[^\s]+[.]lrc(?:[?#]|$)/i.test(source);if(!remote){showLrc(source,request);return;}root.dataset.musicLrcState='loading';syncLrcVisibility();var controller=typeof AbortController==='function'?new AbortController():null;lrcController=controller;fetch(new URL(source,location.href).href,{credentials:'same-origin',signal:controller?controller.signal:undefined}).then(function(response){if(!response.ok)throw new Error(String(response.status));return response.text();}).then(function(payload){showLrc(payload,request);}).catch(function(error){if(request!==lrcRequest||error&&error.name==='AbortError')return;root.dataset.musicLrcState='error';root.dataset.musicHasLrc='false';syncLrcVisibility();notify('歌词加载失败');}).then(function(){if(request===lrcRequest)lrcController=null;});};
  var clearAutoplayUnlock=function(){if(!autoplayWaiting)return;autoplayWaiting=false;document.removeEventListener('pointerdown',retryAutoplay,true);document.removeEventListener('touchstart',retryAutoplay,true);document.removeEventListener('keydown',retryAutoplay,true);if(root.dataset.musicState==='autoplay-waiting')root.dataset.musicState='ready';};
  var retryAutoplay=function(event){if(!autoplayWaiting||!tracks.length||root.contains(event.target))return;clearAutoplayUnlock();requestPlay('autoplay');};
  var armAutoplayUnlock=function(){if(autoplayWaiting)return;autoplayWaiting=true;root.dataset.musicState='autoplay-waiting';document.addEventListener('pointerdown',retryAutoplay,true);document.addEventListener('touchstart',retryAutoplay,true);document.addEventListener('keydown',retryAutoplay,true);};
  var handlePlayFailure=function(error,reason){root.dataset.musicLoading='false';if(error&&error.name==='AbortError')return;if(reason==='autoplay'&&error&&error.name==='NotAllowedError'){armAutoplayUnlock();return;}notify('音频暂时不可用');};
  var requestPlay=function(reason){root.dataset.musicLoading='true';var attempt;try{attempt=audio.play();}catch(error){handlePlayFailure(error,reason);return;}if(attempt&&typeof attempt.then==='function')attempt.then(clearAutoplayUnlock).catch(function(error){handlePlayFailure(error,reason);});};
  var clearMetadataTimer=function(){if(metadataTimer!==null){clearTimeout(metadataTimer);metadataTimer=null;}};
  var failTrack=function(generation){if(!tracks.length||generation!==loadGeneration||handledFailure===generation)return;handledFailure=generation;clearMetadataTimer();failed+=1;if(failed>=tracks.length){notify('歌单音频地址均不可用');audio.pause();return;}notify('当前音频不可用，已跳到下一首');setTimeout(function(){if(generation===loadGeneration)move(1,true);},900);};
  var markMetadataReady=function(){clearMetadataTimer();root.dataset.musicLoading='false';syncPlayback();};
  var markPlaying=function(){clearMetadataTimer();failed=0;handledFailure=-1;root.dataset.musicLoading='false';syncPlayback();};
  var markCurrent=function(){if(!listItems)return;Array.prototype.forEach.call(listItems.children,function(row,i){row.setAttribute('aria-current',i===index?'true':'false');});if(list&&root.dataset.musicListOpen==='true')listItems.scrollTop=33*index;};
  var applyTheme=function(theme){root.style.setProperty('--music-player-theme',theme||'#2980b9');};
  // Background-preload the next track. The hidden <audio> element fetches
  // and decodes the audio bytes while the current track is still playing.
  // The two elements swap roles the moment the current track ends so the
  // gap between songs is essentially zero.
  var preloadNext=function(nextIndex){if(!tracks.length)return;var safeIndex=(nextIndex+tracks.length)%tracks.length;if(safeIndex===index)return;var nextTrack=tracks[safeIndex];if(!nextTrack||!nextTrack.url)return;if(preloadIndex===safeIndex&&preloadUrl===nextTrack.url)return;preloadIndex=safeIndex;preloadUrl=nextTrack.url;preloadReady=false;try{preloadAudio.src=preloadUrl;preloadAudio.load();}catch(_e){preloadReady=false;}};
  var load=function(value,shouldPlay,reason){if(!tracks.length)return;clearMetadataTimer();var generation=++loadGeneration;handledFailure=-1;index=(value+tracks.length)%tracks.length;var track=tracks[index];audio.src=track.url;text(title,track.name);text(author,' - '+track.artist);if(cover){cover.style.backgroundImage=track.cover?'url("'+String(track.cover).replace(/"/g,'%22')+'")':'';}root.dataset.trackIndex=String(index);root.dataset.musicPreview=track.preview?'true':'false';if(track.preview){var secs=track.approxSeconds>0?('，约 '+track.approxSeconds+' 秒'):'';notify('当前歌曲是 30 秒试听片段' + secs + '，完整版需登录态 Cookie 或在 Node 端用解灰服务');}markCurrent();applyTheme(track.theme);loadLrc(track.lrc);text(currentTimeNode,'00:00');text(durationNode,'00:00');if(played)played.style.width='0%';if(loaded)loaded.style.width='0%';metadataTimer=setTimeout(function(){if(generation===loadGeneration&&audio.readyState===0)failTrack(generation);},15000);if(shouldPlay)requestPlay(reason||'playback');preloadNext(index+1);};
  var randomIndex=function(){if(tracks.length<2)return index;var value=index;while(value===index)value=Math.floor(Math.random()*tracks.length);return value;};
  var move=function(direction,shouldPlay){load(orderMode==='random'?randomIndex():index+direction,shouldPlay);};
  var togglePlay=function(){if(!tracks.length){notify(root.dataset.musicState==='loading'?'歌单正在加载':'歌单暂时不可用');return;}audio.paused?requestPlay('manual'):audio.pause();};
  var setListOpen=function(open){if(!list)return;root.dataset.musicListOpen=String(open);list.setAttribute('aria-hidden',String(!open));menuButtons.forEach(function(button){button.setAttribute('aria-expanded',String(open));});if(open)markCurrent();};
  var playlistEndpoint=function(){if(config.playlistUrl)return config.playlistUrl;if(config.provider==='meting-enhanced'&&config.liveProxyUrl)return new URL(config.liveProxyUrl,location.href).href;if(['meting','meting-enhanced'].indexOf(config.provider)<0)return'';var baseUrl=config.provider==='meting-enhanced'?(config.enhancedApiBaseUrl||config.apiBaseUrl):config.apiBaseUrl;if(!baseUrl)return'';var url=new URL(baseUrl,location.href);url.searchParams.set('server',config.server||'netease');url.searchParams.set('type',config.type||'playlist');url.searchParams.set('id',config.resourceId||'3099335800');if(config.provider==='meting-enhanced'&&config.enhancedAuthEnabled===true&&config.enhancedAuthToken)url.searchParams.set('auth',config.enhancedAuthToken);return url.href;};
  var start=function(data){tracks=normalize(data);if(!tracks.length){root.dataset.musicState='empty';notify('歌单暂时不可用');return;}renderList();root.dataset.musicState='ready';load(0,config.autoplay===true,'autoplay');};
  playButtons.forEach(function(button){button.addEventListener('click',togglePlay);});
  prev&&prev.addEventListener('click',function(){move(-1,true);});next&&next.addEventListener('click',function(){move(1,true);});
  menuButtons.forEach(function(button){button.addEventListener('click',function(){setListOpen(root.dataset.musicListOpen!=='true');});});
  narrow&&narrow.addEventListener('click',function(){var collapsed=root.dataset.musicCollapsed!=='true';root.dataset.musicCollapsed=String(collapsed);narrow.setAttribute('aria-expanded',String(!collapsed));narrow.setAttribute('aria-label',collapsed?'展开播放器':'收起播放器');});
  orderButton&&orderButton.addEventListener('click',function(){orderMode=orderMode==='list'?'random':'list';root.dataset.musicOrderState=orderMode;orderButton.setAttribute('aria-label',orderMode==='list'?'顺序播放':'随机播放');});
  loopButton&&loopButton.addEventListener('click',function(){loopMode=loopMode==='all'?'one':loopMode==='one'?'none':'all';root.dataset.musicLoopState=loopMode;loopButton.setAttribute('aria-label',loopMode==='all'?'列表循环':loopMode==='one'?'单曲循环':'不循环');});
  lrcToggle&&lrcToggle.addEventListener('click',function(){if(!lrc)return;if(root.dataset.musicLrcState==='loading'){lrcVisiblePreference=true;notify('歌词正在加载');return;}if(root.dataset.musicHasLrc!=='true'){notify(root.dataset.musicLrcState==='error'?'歌词加载失败':'当前歌曲暂无歌词');return;}if(root.dataset.musicLrcTiming==='estimated')notify('歌词源无时间戳，当前行按播放进度估算');lrcVisiblePreference=root.dataset.musicLrcVisible!=='true';syncLrcVisibility();});
  progress&&progress.addEventListener('click',function(event){if(!Number.isFinite(audio.duration)||audio.duration<=0)return;var rect=progress.getBoundingClientRect();audio.currentTime=clamp((event.clientX-rect.left)/rect.width,0,1)*audio.duration;});
  volumeBar&&volumeBar.addEventListener('click',function(event){var rect=volumeBar.getBoundingClientRect(),value=clamp((rect.bottom-event.clientY)/rect.height,0,1);audio.volume=value;if(value>0)lastVolume=value;storeVolume(value);updateVolume();});
  volumeToggle&&volumeToggle.addEventListener('click',function(){if(audio.volume){lastVolume=audio.volume;audio.volume=0;}else audio.volume=lastVolume||configuredVolume||.7;storeVolume(audio.volume);updateVolume();});
  var bindAudioEvents=function(el){el.addEventListener('play',function(){clearAutoplayUnlock();root.dataset.musicLoading='false';root.dataset.musicPlaying='true';playButtons.forEach(function(button){button.setAttribute('aria-label','暂停');});syncPlayback();});el.addEventListener('pause',function(){root.dataset.musicPlaying='false';playButtons.forEach(function(button){button.setAttribute('aria-label','播放');});syncPlayback();});['loadedmetadata','loadeddata','canplay'].forEach(function(eventName){el.addEventListener(eventName,markMetadataReady);});['durationchange','seeking','seeked','ratechange','emptied'].forEach(function(eventName){el.addEventListener(eventName,syncPlayback);});el.addEventListener('playing',markPlaying);el.addEventListener('progress',function(){if(!loaded||!audio.buffered.length||!Number.isFinite(audio.duration)||audio.duration<=0)return;loaded.style.width=(audio.buffered.end(audio.buffered.length-1)/audio.duration*100)+'%';});el.addEventListener('timeupdate',syncPlayback);el.addEventListener('ended',function(){if(loopMode==='one'){audio.currentTime=0;requestPlay('playback');return;}if(loopMode==='all'||index<tracks.length-1){if(preloadReady&&preloadIndex===(index+1)%tracks.length){swapToPreloaded();return;}move(1,true);}});el.addEventListener('error',function(){failTrack(loadGeneration);});};
  bindAudioEvents(audio);
  bindAudioEvents(preloadAudio);
  // Hot-swap: the hidden <audio> already has the next track decoded; promote
  // it to the visible slot, demote the old one, and re-arm the preload for
  // the track after that. Avoids re-entering load() and re-downloading.
  var swapToPreloaded=function(){if(!preloadReady)return false;var swap=audio;audio=preloadAudio;preloadAudio=swap;var newIndex=preloadIndex;var nextNext=(newIndex+1)%tracks.length;preloadIndex=-1;preloadUrl='';preloadReady=false;index=newIndex;var swapTrack=tracks[index];text(title,swapTrack.name);text(author,' - '+swapTrack.artist);if(cover){cover.style.backgroundImage=swapTrack.cover?'url("'+String(swapTrack.cover).replace(/"/g,'%22')+'")':'';}root.dataset.trackIndex=String(index);markCurrent();applyTheme(swapTrack.theme);loadLrc(swapTrack.lrc);text(currentTimeNode,'00:00');text(durationNode,'00:00');if(played)played.style.width='0%';if(loaded)loaded.style.width='0%';requestPlay('playback');preloadNext(nextNext);return true;};
  audio.addEventListener('error',function(){failTrack(loadGeneration);});
  window.addEventListener('pageshow',syncPlayback);document.addEventListener('visibilitychange',function(){if(!document.hidden)syncPlayback();});
  var endpoint=playlistEndpoint();if(endpoint){var playlistAttempts=0;var fetchPlaylist=function(){playlistAttempts+=1;var controller=typeof AbortController==='function'?new AbortController():null;var timer=setTimeout(function(){if(controller)controller.abort();},12000);fetch(endpoint,{headers:{accept:'application/json'},signal:controller?controller.signal:undefined}).then(function(response){if(!response.ok)throw new Error(String(response.status));return response.json();}).then(function(data){if(normalize(data).length){start(data);return;}if(playlistAttempts<3){setTimeout(fetchPlaylist,600);return;}start(data);}).catch(function(){if(playlistAttempts<3){setTimeout(fetchPlaylist,600);return;}root.dataset.musicState='error';notify('无法载入外部歌单');}).then(function(){clearTimeout(timer);});};fetchPlaylist();}else start(window.__htmlServerMusicPlaylist||[]);
})();
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
      try{sessionStorage.setItem('html-server:navigation-handoff',JSON.stringify({target:target.pathname+target.search,createdAt:Date.now()}));}catch(error){}
      document.documentElement.setAttribute('data-html-server-navigation-leaving','');
      beginPageProgress();
    }
    if(replace)location.replace(target.href);else location.assign(target.href);
  }
  window.HtmlServerHardNavigation=hardNavigate;
  window.HtmlServerPageProgress={start:beginPageProgress,complete:finishPageProgress};
  var layoutHooks=new Map(),optionalRuntimeApi={};
  var appearanceContract={layouts:[]};try{appearanceContract=JSON.parse(document.querySelector('[data-blog-appearance-contract]').textContent);}catch(error){}
  var layoutAdapters=new Map();
  function setAppearance(next){
    next=next||{};var previous={layout:body.dataset.blogLayout,theme:body.dataset.blogLayoutTheme};
    var layout=next.layout||previous.layout,theme=next.theme||previous.theme;
    var definition=(appearanceContract.layouts||[]).find(function(item){return item.id===layout;});if(!definition)return false;
    if((definition.themes||[]).indexOf(theme)<0)theme=(definition.themes||[]).indexOf('inherit')>=0?'inherit':(definition.themes||[])[0];
    if(layout!==previous.layout){var adapter=layoutAdapters.get(layout);if(!adapter||adapter({previous:previous,next:{layout:layout,theme:theme}})===false)return false;body.dataset.blogLayout=layout;if(navigationProgress)navigationProgress.className=navigationProgress.className.replace('html-server-blog-progress-'+previous.layout,'html-server-blog-progress-'+layout);}
    body.dataset.blogLayoutTheme=theme;document.documentElement.dataset.blogLayout=layout;document.documentElement.dataset.blogLayoutTheme=theme;document.dispatchEvent(new CustomEvent('html-server:appearance-change',{detail:{previous:previous,next:{layout:layout,theme:theme}}}));return true;
  }
  optionalRuntimeApi={getAppearance:function(){return {layout:body.dataset.blogLayout,theme:body.dataset.blogLayoutTheme};},setAppearance:setAppearance,registerLayoutAdapter:function(id,adapter){if(id&&typeof adapter==='function')layoutAdapters.set(id,adapter);}};
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
    document.documentElement.style.backgroundColor = dark
      ? 'var(--html-server-navigation-surface-dark, var(--html-server-blog-background-dark, #151515))'
      : 'var(--html-server-navigation-surface-light, var(--html-server-blog-background-light, #f5f7fa))';
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