var users = require('../models/users');
var stories = require('../models/stories');

// ログイン処理
exports.login = function (req, res) {
	// Getリクエストに対する処理
	res.render('login', {
		page: { title: 'login' },
		user: null,
		name: '',
		error: 200,
		loginFailed: false
	});
	return;
}

// ログインフォームの処理
exports.login.post = function (req, res) {
	var name = req.body.name || '';
	var password = req.body.password || '';

	function authCallback(err, userInfo) {
		// 認証失敗	
		if (err || userInfo === null) {
			res.render('login', {
				page: { title: 'login' },
				user: null,
				name: name,
				error: 200,
				loginFailed: true
			});
			return;
		}
		// 認証成功
		req.session.user = {
			uid: userInfo.uid,
			name: userInfo.name
		};
		res.redirect('/');
		return;
	}
	users.authenticate (name, password, authCallback);
}

// ログアウト
exports.logout = function (req, res) {
	req.session.destroy(function (err) {
		res.redirect('/');
	});
}

// 記事の作成
exports.create = function (req, res) {
	if (req.session.user === undefined) {
		res.redirect(403, '/');
		return;
	}
	res.render('create-story', {
		story: {},
		page: { title: 'New Story' },
		user: req.session.user,
		error: 200,
	});
}

// 記事の作成フォームを受け付ける
exports.create.post = function(req, res) {
	if (req.session.user === undefined) {
		res.redirect(403, '/');
		return;
	}
	var story = {};
	story.title = req.body.title;
	story.slug = req.body.slug;
	story.body = req.body.body;

	stories.insert(story, function (err) {
		if (err) {
			res.send(500);
			return;
		}
		res.redirect('/');
	});
}

// インデックスページの表示
exports.index = function(req, res) {
var i=0;	
console.log("index : " + i++);
	var pageNum = Number(req.query.page) || 1;

console.log("index : " + i++);
	var count = 10;

console.log("index : " + i++);
	var skip = count * (pageNum - 1);


console.log("index : " + i++);
	// count + １件を取得して、次のページがあるかどうかチェック
	stories.getLatest(count + 1, skip, function (err, items) {
		if (err) {
			res.send(500);
			console.log('cannnot retrieve stories');
			console.log(err);
			return;
		}

		// 取得された記事数がcountよりも多ければ次がある
		var nextPage = null;
		if (items.length > count) {
			nextPage = '/?page=' + (pageNum + 1);
			items.pop();
		}

		// Skipされていれば前のページがある。
		var previousPage = null;
		if (skip > 0) {
			if (pageNum == 2) {
				previousPage = '/';
			} else {
				previousPage = '/?page=' + (pageNum - 1);
			}
		}

		// テンプレートに与えるパラメタの用意
		var params = {
			page: {
				title: 'nblog',
				next: nextPage,
				previous: previousPage
			},
			user: req.session.user || null,
			stories: items,
			request: req
		}

		// indexテンプレートをレンダリング
		res.render('index', params);
	});
};

// 単一記事の表示
exports.single = function(req, res) {
	stories.getBySlug(req.params.slug, function (err, item) {
		if (err) {
			res.send(500);
			console.log('cannnot retrieve stories');
			console.log(err);
			return;
		}
		if (item === null) {
			res.send(404);
			return;
		}
		res.render('single', {
			page: { title: 'nblog' },
			user: req.session.user || null,
			story: item
		});
	});
};
