module.exports = (app) => {
  //
  app.get('/m/demo/get-list', (req, res) => {
    console.log(req.query);
    res.json({
      'errcode': 0,
      'message': 'Success',
      'data': {
        'items': [
          {
            'id': '39ea8de6-cb5f-4999-8438-830c2cbd44e1',
            'code': '234',
            'title': 'aaaaa',

          },
          {
            'id': '39ea8de6-e2cf-33a1-d6d4-54adb762d3e5',
            'code': '432',
            'title': 'bbbbbb',

            'enabled': '0'
          }
        ],
        'totalCount': '8'
      }
    }
    );
  });


  //
  app.post('/m/demo/save', (req, res) => {
    res.json({
      'errcode': 0,
      'message': 'Success',
      'data': []
    }
    );
  });

};
