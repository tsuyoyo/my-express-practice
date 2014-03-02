# やったこと
* [はじめてのNode.js - サーバサイドJavaScriptでWebアプリを開発する](http://www.amazon.co.jp/%E3%81%AF%E3%81%98%E3%82%81%E3%81%A6%E3%81%AENode-js-%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%82%B5%E3%82%A4%E3%83%89JavaScript%E3%81%A7Web%E3%82%A2%E3%83%97%E3%83%AA%E3%82%92%E9%96%8B%E7%99%BA%E3%81%99%E3%82%8B-%E6%9D%BE%E5%B3%B6-%E6%B5%A9%E9%81%93/dp/4797370904 "source") の9章の写経。nodejsのアプリケーションフレームワーク、expressを触ってみる。
* [作者の作ったソースコード](http://sourceforge.jp/users/hylom/pf/node_sample_nblog/scm/tree/master/ "sourcecode")


# mySQLのインストール
* nodeのmySQLへアクセスするmoduleを利用してはいるが、当然サーバ側のmySQLは別途セットアップが必要。	
* 参考サイト http://www.yukun.info/blog/2013/03/mac-mysql-install.html
* DB作成のクエリ（本のコード）http://sourceforge.jp/users/hylom/pf/node_sample_nblog/scm/blobs/master/config.json
* DBのアカウント作成の参考サイト (GRUNT構文、という言葉のお勉強になった)
    * http://wiki.minaco.net/index.php?MySQL%2F%E3%83%A6%E3%83%BC%E3%82%B6%E3%81%A8DB%E4%BD%9C%E6%88%90
    * http://phpjavascriptroom.com/?t=mysql&p=grant
* mySQLのデフォルトのポート、3306
* "> USE DB_name" と打って、DBに接続
* ファイルに書いたSQL文の実行は、"> source file_name" で行える

# 気付いた事
* この本はexpress 3.0.3 をベースにしているが、2014/2/24時点で既にちょっと古い (3.4.8) 。
    * app.configure は既にlegacy扱いになっていて、expressの作るスケルトンには出てこない。
* view/public/css 以下にbootstrap-responsive.min.cssを格納しているが、bootstrap3でこのファイルは不要になっている。[参考](http://bootstrap.s1.adexd.net/)

# Jade
* extendsとblock [参考](https://gist.github.com/japboy/5402844#extends-%E3%81%A8-block)

