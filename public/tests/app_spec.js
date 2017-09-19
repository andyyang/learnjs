describe('LearnJS', function(){
  it('can show a problem view', function(){
    learnjs.showView('#problem-1');
    expect($('.view-container .problem-view').length).toEqual(1);
  });

  it('shows the landing page view when there is no hash', function(){
    learnjs.showView('');
    expect($('.view-container .landing-view').length).toEqual(1);
  });

  it('passes the hash view parameter to the view function', function(){
    spyOn(learnjs, 'problemView');
    learnjs.showView('#problem-42');
    expect(learnjs.problemView).toHaveBeenCalledWith('42');
  });

  it('invokes the router when loaded', function(){
    spyOn(learnjs, 'showView');
    learnjs.appOnReady();
    expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
  });

  it('subscribes to the hash change event', function(){
    learnjs.appOnReady();
    spyOn(learnjs, 'showView');
    $(window).trigger('hashchange');
    expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
  });

  it('can bind data to elements in the view', function(){
    var problem = { description: 'What is truth?' };
    var view = $('.templates .problem-view').clone();
    learnjs.applyObject(problem, view);
    expect(view.find('[data-name=description]').text()).toEqual(problem.description);
  });
  
  /*
  it('does not display templates', function(){
    expect($('.templates').css('display')).toEqual('none');
  });*/

  describe('problem view', function(){
    it('has a title that includes the problem number', function(){
      var view = learnjs.problemView('1');
      expect(view.find('.title').text()).toEqual('Problem #1');
    });

    it('has content that includes the problem description and code', function(){
      var view = learnjs.problemView('1');
      expect(view.find('[data-name=description]').text()).toEqual(learnjs.problems[0].description);
      expect(view.find('[data-name=code]').text()).toEqual(learnjs.problems[0].code);
    });
 
  });
});
