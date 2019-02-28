if(!window['lezhin']) {
	lezhin = {};
	( function (_O) {
    _O.start = () => {
      _O.Ctrl.gameNewStart.bind(_O.Ctrl)();
    };
    _O.Vars = {
      lists: [
        {
          name: '전지현',
          imgSrc: '../images/01.jpg'
        },
        {
          name: '이영애',
          imgSrc: '../images/02.jpg'
        },
        {
          name: '수지',
          imgSrc: '../images/03.jpg'
        },
        {
          name: '김태희',
          imgSrc: '../images/04.jpg'
        },
        {
          name: '신민아',
          imgSrc: '../images/05.jpg'
        },
        {
          name: '송혜교',
          imgSrc: '../images/06.jpg'
        },
        {
          name: '박보영',
          imgSrc: '../images/07.jpg'
        },
        {
          name: '아이유',
          imgSrc: '../images/08.jpg'
        },
        {
          name: '김사랑',
          imgSrc: '../images/09.jpg'
        },
        {
          name: '아이린',
          imgSrc: '../images/10.jpg'
        },
        {
          name: '이효리',
          imgSrc: '../images/11.jpg'
        },
        {
          name: '한효주',
          imgSrc: '../images/12.jpg'
        },
        {
          name: '한지민',
          imgSrc: '../images/13.jpg'
        },
        {
          name: '이나영',
          imgSrc: '../images/14.jpg'
        },
        {
          name: '이연희',
          imgSrc: '../images/15.jpg'
        },
        {
          name: '고준희',
          imgSrc: '../images/16.jpg'
        }
      ],
      curRound: 16,
      curStage: 0,
      gameHistory: {
        '16': [],
        '8': [],
        '4': [],
        '2': [],
        '1': []
      }
    };
    _O.Ctrl = {
      rndLists(arr) { //배열 랜덤 섞음
        return arr.map((n) => { return [Math.random(), n] }).sort().map((n) => { n[1].selected = false; return n[1] });
      },
      selectedLists(arr) {
        return arr.filter((n) => {
          if(n.selected === true) {
            n.selected = false;
            return n;
          }
        });
      },
      gameNewStart() {
        const v = _O.Vars;
        v.gameHistory[v.curRound.toString()] = this.rndLists(v.lists);
        console.log('gameNewStart::gameHistory::', v.gameHistory);
        _O.Html.set.bind(_O.Html)();
      },
      nextRound() {
        const v = _O.Vars;
        if(v.curRound <= 1) return;
        if(v.curRound > 1) v.curRound /= 2;
        v.curStage = 0;
        v.lists = _O.Ctrl.selectedLists(v.gameHistory[(v.curRound * 2).toString()]);
        v.gameHistory[v.curRound.toString()] = this.rndLists(v.lists);
        _O.Html.setRoundTitle();
        _O.Html.setItem();
      }
    };
    _O.Event = {
      clickItem(obj) {
        if(_O.Vars.curRound === 1) return;
        const e = window.event;
        const idx = obj.id.split('_')[1];
        _O.Vars.gameHistory[_O.Vars.curRound.toString()][idx].selected = true;
        obj.className = 'item selected';
        if(_O.Vars.curStage < _O.Vars.curRound/2) _O.Vars.curStage++;
        if(_O.Vars.curStage === _O.Vars.curRound/2) _O.Ctrl.nextRound();
        _O.Html.setItem();
      }
    };
    _O.Html = {
      set() {
        this.setRoundTitle();
        this.setContent();
      },
      setRoundTitle() {
        if(_O.Vars.curRound > 1) document.getElementById('roundTitle').innerText = `${_O.Vars.curRound}강 선택`;
        else document.getElementById('roundTitle').innerText = `축하합니다. 최종 이상형이 선정되었습니다.`;
      },
      setItem() {
        const s = _O.Html.getItem();
        const tObj = document.getElementById('list_ideal');
        if(!tObj) return;
        tObj.innerHTML = s;
      },
      getItem() {
        let s = '', i = _O.Vars.curStage * 2, length = i + (_O.Vars.curRound > 1 ? 2 : _O.Vars.curRound);
        for(i; i < length && length <= _O.Vars.curRound; i++) {
          s += `
          <li>
            <a class="item" id="item_${i}" href="javascript:void(0);" onclick="lezhin.Event.clickItem(this);">
              <span class="thumb"><img src="${_O.Vars.gameHistory[_O.Vars.curRound.toString()][i]['imgSrc']}" alt="여자 연예인 사진"></span>
              <span class="tit">이름: ${_O.Vars.gameHistory[_O.Vars.curRound.toString()][i]['name']}</span>
            </a>
          </li>
          `;
        }
        return s;
      },
      setContent() {
        const tObj = document.getElementById('content');
        tObj.className = 'content in_game';
        let s = `
          <ul class="list_ideal" id="list_ideal">
          ${this.getItem()}
          </ul>
        `;
        tObj.innerHTML = s;
      }
    }
	}) (lezhin);
}