import Alert from './alert'

import Box from '../components/box'
import Btn from '../components/btn'
import Cta from '../components/cta'
import Tabs from '../components/tabs'
import Icon from '../components/icon'
import Field from '../components/field'
import Modal from '../components/modal'
import Checkbox from '../components/checkbox'
import DataTable from '../components/data-table'
import Datepicker from '../components/datepicker'
import PageHeader from '../components/page-header'
import AsyncPicker from '../components/async-picker'

import Nl2br from '../filters/nl2br'
import Gender from '../filters/gender'
import Address from '../filters/address'
import Slugify from '../filters/slugify'
import Currency from '../filters/currency'
import Truncate from '../filters/truncate'
import Pluralize from '../filters/pluralize'
import Titlecase from '../filters/titlecase'
import DateRange from '../filters/date-range'
import DateFormat from '../filters/date-format'

export default {
    install (Vue, options) {
        Vue.use(Alert)

        Vue.component('box', Box)
        Vue.component('btn', Btn)
        Vue.component('tabs', Tabs)
        Vue.component('icon', Icon)
        Vue.component('field', Field)
        Vue.component('modal', Modal)
        Vue.component('checkbox', Checkbox)
        Vue.component('data-table', DataTable)
        Vue.component('datepicker', Datepicker)
        Vue.component('page-header', PageHeader)
        Vue.component('async-picker', AsyncPicker)

        Vue.filter('nl2br', Nl2br)
        Vue.filter('gender', Gender)
        Vue.filter('address', Address)
        Vue.filter('slugify', Slugify)
        Vue.filter('currency', Currency)
        Vue.filter('truncate', Truncate)
        Vue.filter('pluralize', Pluralize)
        Vue.filter('titlecase', Titlecase)
        Vue.filter('dateRange', DateRange)
        Vue.filter('dateFormat', DateFormat)
    },
}