const tabs = document.querySelectorAll('.button-tab');

  // Функция для загрузки содержимого вкладки
  function loadTabContent(fileName, element) {
    fetch(fileName)
      .then(response => response.text())
      .then(html => {
        document.getElementById('content').innerHTML = html;
        
        // Обновление стиля активной вкладки
        if(fileName==='analytics.html'){
          const filters = document.getElementById('filters');
          console.log(filters);
          filters.addEventListener('click', function(e) {
            if(e.target.tagName === 'BUTTON') {
              Array.prototype.forEach.call(e.currentTarget.children, filter => {
                filter.classList.remove('active-filter');
              });
              e.target.classList.add('active-filter');
  }
});
        }
        tabs.forEach(tab => tab.classList.remove('active-content'));
        element.classList.add('active-content');
      })
      .catch(err => console.error('Ошибка при загрузке содержимого вкладки:', err));
  }

  // Добавляем обработчики событий на вкладки
  tabs.forEach(tab => {
    tab.addEventListener('click', function(e) {
      e.preventDefault();
      const fileName = this.getAttribute('data-file');

      loadTabContent(fileName, this);
    });
  });

  // Загружаем содержимое первой вкладки по умолчанию
  loadTabContent('main.html', tabs[0]);