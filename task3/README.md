Задание №3
==========

Создайте с помощью WebAudio API плеер, который:

+ умеет открывать аудиофайлы (поддерживаемых браузером форматов) с локального диска;
+ поддерживает drag'n'drop;
+ имеет кнопки play и stop;
+ выводит название проигрываемого файла;
+ умеет отображать хотя бы один вариант визуализации (waveform или spectrum);
+ работает в Яндекс.Браузере, Safari, Chrome, Firefox.

Дополнительно реализуйте возможность:

+ выбора настройки эквалайзера (pop, rock, jazz, classic, normal);
+ вывод названия песни и исполнителя из метаданных аудиофайла.

Результат пришлите в виде двух ссылок: на работающий пример и на исходный код на GitHub.

Решение
=======

Шаг 1. Немого теории
--------------------

###Webaudio API

Читаю [статью](http://www.html5rocks.com/en/tutorials/webaudio/intro/) c html5rocks. 
Потом [это](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) с MDN.

###Эквалайзер

Почитала википедию и посмотрела, как он сделан в iTunes. Ещё [статья](http://habrahabr.ru/post/240819/) на хабре.
Вот ещё [теория](http://clippu.net/threads/nastrojka-ehkvalajzera-osnovy-tembrovoj-korrekcii.571/) для продвинутых.

###File API

Читаю [статью](http://www.html5rocks.com/ru/tutorials/file/dndfiles/) c html5rocks 
и соответствующий [вопрос](http://stackoverflow.com/questions/14074833/using-local-file-for-web-audio-api-in-javascript) на stack-overflow.

Шаг 2. Практика
---------------

Сделала скучную вёрстку.

Добавила чтение данных файла с помощью библиотеки [JavaScript-ID3-Reader](https://github.com/aadsm/JavaScript-ID3-Reader).

Добавила drag-n-drop, см. [туториал](http://www.html5rocks.com/en/tutorials/file/dndfiles) с html5rocks.

Добавила воспроизведение файла.

Добавляю визуализатор, но есть проблема с Safari. Моя проблема в том, что данные про частоты просто не обновляются. Эта проблема не только не у меня, та же проблема и у [людей с более прямыми руками](https://github.com/jsantell/web-audio-api-bugs/tree/gh-pages/MediaElement-to-AnalyserNode), причём давно.

Эквалайзер пока не реализован.

Ответ
=====

[Пример](http://oktosha.github.io/shri2015/task3/)

[Код](https://github.com/Oktosha/shri2015/tree/master/task3)