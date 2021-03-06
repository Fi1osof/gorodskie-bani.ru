<?php


$tabs = '
[
{"caption":"Renderoption", "fields": [
{"field":"name","caption":"Name"},
{"field":"value","caption":"Value"},
{"field":"clickaction","caption":"on Click","inputTVtype":"listbox","inputOptionValues":"||switchOption||selectFromGrid"},
{"field":"handler","caption":"Handler"},
{"field":"image","caption":"Image","inputTVtype":"image"}
]}
] 
';

$columns = '
[
{
  "header": "Name"
, "width": "20"
, "dataIndex": "name"
},
{
  "header": "Value"
, "width": "20"
, "dataIndex": "value"
},
{
  "header": "Image"
, "width": "20"
, "dataIndex": "image"
, "renderer":"this.renderImage"
}
]
';


$this->customconfigs['tabs'] = $this->modx->fromJson($tabs);
$this->customconfigs['columns'] = $this->modx->fromJson($columns);