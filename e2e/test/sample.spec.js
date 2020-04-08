describe('add todo', function () {
    let page;
    var count_global = 1;
    
    before (async function () {
      page = await browser.newPage();
      await page.goto('http://127.0.0.1:7001/');
    });
  
    after (async function () {
      await page.close();
    });

    it('should have correct title', async function() {
        expect(await page.title()).to.eql('Koa • Todo');
    })
    it('should new todo correct', async function() {
      await page.click('#new-todo', {delay: 500});
      await page.type('#new-todo', 'new todo item', {delay: 50});
      await page.keyboard.press("Enter");
      let todoList = await page.waitFor('#todo-list');
      const expectInputContent = await page.evaluate(todoList => todoList.lastChild.querySelector('label').textContent, todoList);
      expect(expectInputContent).to.eql('new todo item');
    }) 


  it('should complete seccessfully', async function(){ 
    const _before = await page.$eval('#todo-count > strong',el => el.value);
    await page.click('#todo-list > li:nth-child(1) > div > input',{delay:50}); 
    const _after = await page.$eval('#todo-count > strong',el => el.value);
    expect(_before).to.eql(_after);
  })

  it('shoule get correct list',async function(){
    const c_list_length = await page.$$eval('#main ul li',e=>{
      var dd = e.length;
      return dd;
    });
    expect(c_list_length).to.eql(count_global + 1);
  })
});