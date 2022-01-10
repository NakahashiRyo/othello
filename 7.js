//<!-- The core Firebase JS SDK is always required and must be listed first -->
src="https://www.gstatic.com/firebasejs/8.6.7/firebase-app.js"

var turn = 0

var ban_ar = new Array(8)
for (var x = 0; x < ban_ar.length; x++){
  ban_ar[x] = new Array(8)
}
      
var ban = document.getElementById('field')
ban_new()
      
ban_init()
      

for (var x = 0; x < 8; x++) {
  for (var y = 0; y < 8; y++) {
    var select_cell = ban.rows[x].cells[y];
    select_cell.onclick = function() {
      if (ban_ar[this.parentNode.rowIndex][this.cellIndex] == 0) {
        document.getElementById("js-local-text").value ="たて"+[this.parentNode.rowIndex+1]+"のよこ"+[this.cellIndex+1];
        m = document.getElementById("js-local-text").value;
        if (check_reverse(this.parentNode.rowIndex,this.cellIndex) > 0){
      ban_set()
      cheng_turn()
        }
      }
    }
  }
}
      
function ban_new() {
  for (var x = 0; x < 8; x++) {
    var tr = document.createElement("tr")
    tr.innerText=x+1;
    ban.appendChild(tr)
    for (var y = 0; y < 8; y++) {
      var td = document.createElement("td")
      td.innerText=y+1;
      tr.appendChild(td)
    }
  }
};
      
function ban_init () {
  for (var x = 0; x < 8; x++) {
    for (var y = 0; y < 8; y++) {
      ban_ar[x][y] = 0
    }
  }
  
  ban_ar[3][3] = -1
  ban_ar[4][3] = 1
  ban_ar[3][4] = 1
  ban_ar[4][4] = -1
  ban_set()
      
  turn = 0
  cheng_turn()
};
      
function ban_set () {
  var stone = ""
  for (var x = 0; x < 8; x++) {
    for (var y = 0; y < 8; y++) {
      switch( ban_ar[x][y] ) {
        case 0:
        stone = ""
        break;
        case -1:
        stone = "○"
        break;
        case 1:
        stone = "●"
        break;
      }
      ban.rows[x].cells[y].innerText = stone;
    }
  }
  return true
};
      
function cheng_turn () {
var tarn_msg = document.getElementById('view_tarn')
  if(turn == 0){
    turn = 1
    tarn_msg.textContent = "黒の番です。"
    return
  }
  turn = turn * -1

  var ban_bak = new Array(8)
  var check_reverse_cnt = 0
  for (var i = 0; i < ban_ar.length; i++){
    ban_bak[i] = new Array(8)
  }
  for (var x = 0; x < 8; x++) {
    for (var y = 0; y < 8; y++) {
      ban_bak[x][y] = ban_ar[x][y]
    }
  }
      
  var white_cnt = 0
  var black_cnt = 0
  for (var x = 0; x < 8; x++) {
    for (var y = 0; y < 8; y++) {
      switch( ban_ar[x][y] ) {
        case 0:
        check_reverse_cnt = check_reverse_cnt + check_reverse(x,y)
        for (var i = 0; i < 8; i++) {
          for (var ii = 0; ii < 8; ii++) {
            ban_ar[i][ii] = ban_bak[i][ii]
          }
        }
        break;
        case -1:
        white_cnt++
        break
        case 1:
        black_cnt++
        break
      }
    }
  }
  if (white_cnt + black_cnt == 64 || white_cnt == 0 || black_cnt == 0){
    if( white_cnt == black_cnt) {
      alert("勝負は引分です。")
    }
    else if (white_cnt > black_cnt) {
      alert("勝負は、黒：" + black_cnt + "対、白：" + white_cnt + "で、白の勝ちです。")
    }
    else {
      alert("勝負は、黒："+ black_cnt + "対、白："+ white_cnt + "で、黒の勝ちです。")
    }  
  }
  else {
    if(check_reverse_cnt == 0){
      switch( turn ) {
        case -1:
        alert("白の置ける場所がありません。続けて黒の番となります。")
        turn = turn * -1
        break;
        case 1:
        alert("黒の置ける場所がありません。続けて白の番となります。")
        turn = turn * -1
        break;
      }
    }
  }    
  switch( turn ) {
    case -1:
    tarn_msg.textContent = "白の番です。";
    break;
    case 1:
    tarn_msg.textContent = "黒の番です。";
    break;
  }
};
      
function check_reverse (row_index,cell_indx){
  var reverse_cnt = 0

  reverse_cnt = reverse_cnt + line_reverse(row_index,cell_indx,-1, 0) 
  reverse_cnt = reverse_cnt + line_reverse(row_index,cell_indx,-1, 1) 
  reverse_cnt = reverse_cnt + line_reverse(row_index,cell_indx, 0, 1) 
  reverse_cnt = reverse_cnt + line_reverse(row_index,cell_indx, 1, 1) 
  reverse_cnt = reverse_cnt + line_reverse(row_index,cell_indx, 1, 0) 
  reverse_cnt = reverse_cnt + line_reverse(row_index,cell_indx, 1,-1) 
  reverse_cnt = reverse_cnt + line_reverse(row_index,cell_indx, 0,-1) 
  reverse_cnt = reverse_cnt + line_reverse(row_index,cell_indx,-1,-1) 
      
  return reverse_cnt
}
      
function line_reverse (row_index,cell_indx,add_x,add_y) {
  var ban_bak = new Array(8)
  for (var i = 0; i < ban_ar.length; i++){
    ban_bak[i] = new Array(8)
  }
  for (var x = 0; x < 8; x++) {
    for (var y = 0; y < 8; y++) {
      ban_bak[x][y] = ban_ar[x][y]
    }
  }
  var line_reverse_cnt = 0 
  var turn_flg = 0 
  var xx = row_index 
  var yy = cell_indx 
  while (true){
    xx = xx + add_x
    yy = yy + add_y

    if(xx < 0 || xx > 7 || yy < 0 || yy > 7) {
      break;
    }
    
    if(ban_ar[xx][yy] == 0) {
      break;
    }
    
    if(ban_ar[xx][yy] == turn) {
      turn_flg = 1
      break;
    }
    
    ban_ar[xx][yy] = ban_ar[xx][yy] * -1
    line_reverse_cnt++
  }
  
  if(line_reverse_cnt > 0 ) {
    if(turn_flg == 0) {
      for (var i = 0; i < 8; i++) {
        for (var ii = 0; ii < 8; ii++) {
          ban_ar[i][ii] = ban_bak[i][ii]
          line_reverse_cnt = 0
        }
      }
    }
    else {
      ban_ar[row_index][cell_indx] = turn
    }
  }
      
  return line_reverse_cnt
}
      
const Peer = window.Peer;

(async function main() {
  const localVideo = document.getElementById('js-local-stream');
  const joinTrigger = document.getElementById('js-join-trigger');
  const leaveTrigger = document.getElementById('js-leave-trigger');
  const remoteVideos = document.getElementById('js-remote-streams');
  const roomId = document.getElementById('js-room-id');
  const roomMode = document.getElementById('js-room-mode');
  const localText = document.getElementById('js-local-text');
  const sendTrigger = document.getElementById('js-send-trigger');
  const messages = document.getElementById('js-messages');
  const meta = document.getElementById('js-meta');
  const sdkSrc = document.querySelector('script[src*=skyway]');

  meta.innerText = `
    UA: ${navigator.userAgent}
    SDK: ${sdkSrc ? sdkSrc.src : 'unknown'}
  `.trim();

  const getRoomModeByHash = () => (location.hash === '#sfu' ? 'sfu' : 'mesh');

  roomMode.textContent = getRoomModeByHash();
  window.addEventListener(
    'hashchange',
    () => (roomMode.textContent = getRoomModeByHash())
  );

  const localStream = await navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: true,
    })
    .catch(console.error);

  // Render local stream
  localVideo.muted = true;
  localVideo.srcObject = localStream;
  localVideo.playsInline = true;
  await localVideo.play().catch(console.error);

  // eslint-disable-next-line require-atomic-updates
  const peer = (window.peer = new Peer({
    key: '2ad96c99-424b-422a-a4de-688b8911d3c6',
    debug: 3,
  }));
  document.getElementById("form-button").onclick = function() {
    document.getElementById("form-text").innerHTML = document.getElementById("name").value ;
  }
  // Register join handler
  joinTrigger.addEventListener('click', () => {
    // Note that you need to ensure the peer has connected to signaling server
    // before using methods of peer instance.
    if (!peer.open) {
      return;
    }

    const room = peer.joinRoom(roomId.value, {
      mode: getRoomModeByHash(),
      stream: localStream,
    });

    room.once('open', () => {
      messages.textContent += '=== 参加した ===\n';
    });
    room.on('peerJoin', peerId => {
      messages.textContent += `=== ユーザーが参加した ===\n`;
    });

    // Render remote stream for new peer join in the room
    room.on('stream', async stream => {
      const newVideo = document.createElement('video');
      newVideo.srcObject = stream;
      newVideo.playsInline = true;
      // mark peerId to find it later at peerLeave event
      newVideo.setAttribute('data-peer-id', stream.peerId);
      remoteVideos.append(newVideo);
      await newVideo.play().catch(console.error);
    });

    room.on('data', ({ data, src }) => {
      // Show a message sent to the room and who sent
      messages.textContent += `お相手さん: ${data}\n`;
    });

    // for closing room members
    room.on('peerLeave', peerId => {
      const remoteVideo = remoteVideos.querySelector(
        `[data-peer-id="${peerId}"]`
      );
      remoteVideo.srcObject.getTracks().forEach(track => track.stop());
      remoteVideo.srcObject = null;
      remoteVideo.remove();

      messages.textContent += `=== お相手さんが退会しました ===\n`;
    });

    // for closing myself
    room.once('close', () => {
      sendTrigger.removeEventListener('click', onClickSend);
      messages.textContent += '== 退会しました ===\n';
      window.location.reload();
      Array.from(remoteVideos.children).forEach(remoteVideo => {
        remoteVideo.srcObject.getTracks().forEach(track => track.stop());
        remoteVideo.srcObject = null;
        remoteVideo.remove();
      });
    });

    sendTrigger.addEventListener('click', onClickSend);
    leaveTrigger.addEventListener('click', () => room.close(), { once: true });

    function onClickSend() {
      // Send message to all of the peers in the room via websocket
      room.send(m);

      messages.textContent += `${document.getElementById("form-text").innerHTML}: ${m}\n`;
      m = '';
    }
  });

  peer.on('error', console.error);
})();