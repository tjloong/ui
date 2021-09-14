<template>
    <div class="field w-full text-sm mb-5">
        <label class="block text-xs font-medium leading-5 text-gray-400 uppercase mb-1.5">
            {{ label }} <icon v-if="required" name="health" size="8px" class="text-red-400" />
        </label>

        <slot>
            <template v-if="['text', 'number', 'email'].includes(type)">
                <input class="w-full form-input" :type="type" v-bind="$props" @input="$emit('input', $event.target.value)">
            </template>

            <template v-if="type === 'textarea'">
                <textarea class="w-full form-input" v-bind="$props" @input="$emit('input', $event.target.value)" />
            </template>

            <template v-if="type === 'password'">
                <div class="relative w-full">
                    <input :type="showPw ? 'text' : 'password'" class="w-full pr-10 form-input" v-bind="$props" @input="$emit('input', $event.target.value)">
                    <a class="absolute top-0 right-0 bottom-0 flex items-center justify-center w-12" @click.prevent="showPw = !showPw">
                        <icon :name="showPw ? 'hide' : 'show'" />
                    </a>
                </div>
            </template>

            <template v-if="type === 'date'">
                <datepicker :value="value" :config="config" @input="$emit('input', $event)" />
            </template>

            <template v-if="['select', 'currency'].includes(type)">
                <select class="w-full form-input" :value="value" :placeholder="placeholder" @input="$emit('input', $event.target.value)">
                    <template v-if="type === 'select'">
                        <option v-for="opt in options" :key="opt.value" :value="opt.value">
                            {{ opt.label }}
                        </option>
                    </template>

                    <template v-else-if="type === 'currency'">
                        <option v-for="opt in currencies" :key="opt.value" :value="opt.value">
                            {{ opt.label }}
                        </option>
                    </template>
                </select>
            </template>
        </slot>

        <div v-if="caption" class="mt-1 text-xs" v-html="caption" />

        <template v-if="error">
            <div class="mt-1 text-red-500 font-medium text-xs">
                {{ error }}
            </div>
        </template>
    </div>
</template>

<script>
import Datepicker from './datepicker'

export default {
    name: 'Field',
    props: {
        min: String,
        max: String,
        rows: String,
        step: String,
        label: String,
        error: String,
        config: Object,
        options: Array,
        caption: String,
        required: Boolean,
        placeholder: String,
        type: {
            type: String,
            default: 'text',
        },
        value: [String, Number, Boolean, Array, Object],
    },
    components: {
        Datepicker,
    },
    data () {
        return {
            showPw: false,
        }
    },
    computed: {
        currencies () {
            return [
                { value: 'USD', label: 'USD - US Dollar' },
                { value: 'CAD', label: 'CAD - Canadian Dollar' },
                { value: 'EUR', label: 'EUR - Euro' },
                { value: 'AED', label: 'AED - United Arab Emirates Dirham' },
                { value: 'AFN', label: 'AFN - Afghan Afghani' },
                { value: 'ALL', label: 'ALL - Albanian Lek' },
                { value: 'AMD', label: 'AMD - Armenian Dram' },
                { value: 'ARS', label: 'ARS - Argentine Peso' },
                { value: 'AUD', label: 'AUD - Australian Dollar' },
                { value: 'AZN', label: 'AZN - Azerbaijani Manat' },
                { value: 'BAM', label: 'BAM - Bosnia-Herzegovina Convertible Mark' },
                { value: 'BDT', label: 'BDT - Bangladeshi Taka' },
                { value: 'BGN', label: 'BGN - Bulgarian Lev' },
                { value: 'BHD', label: 'BHD - Bahraini Dinar' },
                { value: 'BIF', label: 'BIF - Burundian Franc' },
                { value: 'BND', label: 'BND - Brunei Dollar' },
                { value: 'BOB', label: 'BOB - Bolivian Boliviano' },
                { value: 'BRL', label: 'BRL - Brazilian Real' },
                { value: 'BWP', label: 'BWP - Botswanan Pula' },
                { value: 'BYN', label: 'BYN - Belarusian Ruble' },
                { value: 'BZD', label: 'BZD - Belize Dollar' },
                { value: 'CDF', label: 'CDF - Congolese Franc' },
                { value: 'CHF', label: 'CHF - Swiss Franc' },
                { value: 'CLP', label: 'CLP - Chilean Peso' },
                { value: 'CNY', label: 'CNY - Chinese Yuan' },
                { value: 'COP', label: 'COP - Colombian Peso' },
                { value: 'CRC', label: 'CRC - Costa Rican Colón' },
                { value: 'CVE', label: 'CVE - Cape Verdean Escudo' },
                { value: 'CZK', label: 'CZK - Czech Republic Koruna' },
                { value: 'DJF', label: 'DJF - Djiboutian Franc' },
                { value: 'DKK', label: 'DKK - Danish Krone' },
                { value: 'DOP', label: 'DOP - Dominican Peso' },
                { value: 'DZD', label: 'DZD - Algerian Dinar' },
                { value: 'EEK', label: 'EEK - Estonian Kroon' },
                { value: 'EGP', label: 'EGP - Egyptian Pound' },
                { value: 'ERN', label: 'ERN - Eritrean Nakfa' },
                { value: 'ETB', label: 'ETB - Ethiopian Birr' },
                { value: 'GBP', label: 'GBP - British Pound Sterling' },
                { value: 'GEL', label: 'GEL - Georgian Lari' },
                { value: 'GHS', label: 'GHS - Ghanaian Cedi' },
                { value: 'GNF', label: 'GNF - Guinean Franc' },
                { value: 'GTQ', label: 'GTQ - Guatemalan Quetzal' },
                { value: 'HKD', label: 'HKD - Hong Kong Dollar' },
                { value: 'HNL', label: 'HNL - Honduran Lempira' },
                { value: 'HRK', label: 'HRK - Croatian Kuna' },
                { value: 'HUF', label: 'HUF - Hungarian Forint' },
                { value: 'IDR', label: 'IDR - Indonesian Rupiah' },
                { value: 'ILS', label: 'ILS - Israeli New Sheqel' },
                { value: 'INR', label: 'INR - Indian Rupee' },
                { value: 'IQD', label: 'IQD - Iraqi Dinar' },
                { value: 'IRR', label: 'IRR - Iranian Rial' },
                { value: 'ISK', label: 'ISK - Icelandic Króna' },
                { value: 'JMD', label: 'JMD - Jamaican Dollar' },
                { value: 'JOD', label: 'JOD - Jordanian Dinar' },
                { value: 'JPY', label: 'JPY - Japanese Yen' },
                { value: 'KES', label: 'KES - Kenyan Shilling' },
                { value: 'KHR', label: 'KHR - Cambodian Riel' },
                { value: 'KMF', label: 'KMF - Comorian Franc' },
                { value: 'KRW', label: 'KRW - South Korean Won' },
                { value: 'KWD', label: 'KWD - Kuwaiti Dinar' },
                { value: 'KZT', label: 'KZT - Kazakhstani Tenge' },
                { value: 'LBP', label: 'LBP - Lebanese Pound' },
                { value: 'LKR', label: 'LKR - Sri Lankan Rupee' },
                { value: 'LTL', label: 'LTL - Lithuanian Litas' },
                { value: 'LVL', label: 'LVL - Latvian Lats' },
                { value: 'LYD', label: 'LYD - Libyan Dinar' },
                { value: 'MAD', label: 'MAD - Moroccan Dirham' },
                { value: 'MDL', label: 'MDL - Moldovan Leu' },
                { value: 'MGA', label: 'MGA - Malagasy Ariary' },
                { value: 'MKD', label: 'MKD - Macedonian Denar' },
                { value: 'MMK', label: 'MMK - Myanma Kyat' },
                { value: 'MOP', label: 'MOP - Macanese Pataca' },
                { value: 'MUR', label: 'MUR - Mauritian Rupee' },
                { value: 'MXN', label: 'MXN - Mexican Peso' },
                { value: 'MYR', label: 'MYR - Malaysian Ringgit' },
                { value: 'MZN', label: 'MZN - Mozambican Metical' },
                { value: 'NAD', label: 'NAD - Namibian Dollar' },
                { value: 'NGN', label: 'NGN - Nigerian Naira' },
                { value: 'NIO', label: 'NIO - Nicaraguan Córdoba' },
                { value: 'NOK', label: 'NOK - Norwegian Krone' },
                { value: 'NPR', label: 'NPR - Nepalese Rupee' },
                { value: 'NZD', label: 'NZD - New Zealand Dollar' },
                { value: 'OMR', label: 'OMR - Omani Rial' },
                { value: 'PAB', label: 'PAB - Panamanian Balboa' },
                { value: 'PEN', label: 'PEN - Peruvian Nuevo Sol' },
                { value: 'PHP', label: 'PHP - Philippine Peso' },
                { value: 'PKR', label: 'PKR - Pakistani Rupee' },
                { value: 'PLN', label: 'PLN - Polish Zloty' },
                { value: 'PYG', label: 'PYG - Paraguayan Guarani' },
                { value: 'QAR', label: 'QAR - Qatari Rial' },
                { value: 'RON', label: 'RON - Romanian Leu' },
                { value: 'RSD', label: 'RSD - Serbian Dinar' },
                { value: 'RUB', label: 'RUB - Russian Ruble' },
                { value: 'RWF', label: 'RWF - Rwandan Franc' },
                { value: 'SAR', label: 'SAR - Saudi Riyal' },
                { value: 'SDG', label: 'SDG - Sudanese Pound' },
                { value: 'SEK', label: 'SEK - Swedish Krona' },
                { value: 'SGD', label: 'SGD - Singapore Dollar' },
                { value: 'SOS', label: 'SOS - Somali Shilling' },
                { value: 'SYP', label: 'SYP - Syrian Pound' },
                { value: 'THB', label: 'THB - Thai Baht' },
                { value: 'TND', label: 'TND - Tunisian Dinar' },
                { value: 'TOP', label: 'TOP - Tongan Paʻanga' },
                { value: 'TRY', label: 'TRY - Turkish Lira' },
                { value: 'TTD', label: 'TTD - Trinidad and Tobago Dollar' },
                { value: 'TWD', label: 'TWD - New Taiwan Dollar' },
                { value: 'TZS', label: 'TZS - Tanzanian Shilling' },
                { value: 'UAH', label: 'UAH - Ukrainian Hryvnia' },
                { value: 'UGX', label: 'UGX - Ugandan Shilling' },
                { value: 'UYU', label: 'UYU - Uruguayan Peso' },
                { value: 'UZS', label: 'UZS - Uzbekistan Som' },
                { value: 'VEF', label: 'VEF - Venezuelan Bolívar' },
                { value: 'VND', label: 'VND - Vietnamese Dong' },
                { value: 'XAF', label: 'XAF - CFA Franc BEAC' },
                { value: 'XOF', label: 'XOF - CFA Franc BCEAO' },
                { value: 'YER', label: 'YER - Yemeni Rial' },
                { value: 'ZAR', label: 'ZAR - South African Rand' },
                { value: 'ZMK', label: 'ZMK - Zambian Kwacha' },
                { value: 'ZWL', label: 'ZWL - Zimbabwean Dollar' },
            ]
        }
    }
}
</script>

<style>
.box .field:last-child {
    margin-bottom: 0;
}

input.form-input,
select.form-input,
textarea.form-input {
    @apply appearance-none py-1.5 px-3 border border-gray-300 rounded-md leading-normal bg-white text-sm;
}

input.form-input:hover,
select.form-input:hover,
textarea.form-input:hover {
    @apply border border-gray-400;
}

input.form-input:focus,
select.form-input:focus,
textarea.form-input:focus {
    @apply border-2 border-gray-700;
}

/* required */
.required::after {
    @apply text-red-500;
    content: " ∗";
}
</style>


